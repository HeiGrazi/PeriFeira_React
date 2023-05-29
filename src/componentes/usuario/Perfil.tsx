import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TokenState } from '../../store/tokens/tokensReducer';
import { Usuario } from '../../model/Usuario';
import { buscaId, atualiza } from '../../services/Service';
import { Box, Typography, Stack, Button, Card, CardMedia, IconButton, InputAdornment  } from '@mui/material'
import { toast } from 'react-toastify'
import './Perfil.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import {
	Grid,
		Avatar,
		TextField,
} from '@mui/material';
import { Link } from 'react-router-dom';

function Perfil() {
	const token = useSelector<TokenState, TokenState['tokens']>(
			(state) => state.tokens
			);
	const userId = useSelector<TokenState, TokenState['id']>((state) => state.id);

	const [usuario, setUsuario] = useState<Usuario>({
id: +userId,
foto: '',
nome: '',
usuario: '',
senha: '',
produtos: null,
});

async function getUsuario() {
	try {
		await buscaId(`/usuarios/${usuario.id}`, setUsuario, {
headers: {
Authorization: token,
},
});
} catch (error) {
	console.log(error);
}
}

useEffect(() => {
		getUsuario();
		setVerificar(false)
		}, []);

useEffect(() => {
		setUsuario({
				...usuario,
				senha: ''
				})
		}, [usuario.usuario])

const [confirmarSenha, setConfirmarSenha] = useState<string>('');
const [verificar, setVerificar] = useState<boolean>(false)
const [nomeError, setNomeError] = useState<boolean>(false);
const [emailError, setEmailError] = useState<boolean>(false);
const [senhaError, setSenhaError] = useState<boolean>(false);
const [showPassword, setShowPassword] = useState(false);
const handleClickShowPassword = () => setShowPassword(!showPassword);

async	function validateNome(event: ChangeEvent<HTMLInputElement>) {
	setNomeError(usuario.nome.length < 1);
}

async	function validateEmail(event: ChangeEvent<HTMLInputElement>) {
	setEmailError(usuario.usuario.includes('@'));
}

async function validateSenha(event: ChangeEvent<HTMLInputElement>) {
	setSenhaError(usuario.senha.length < 8 )
}

function confirmSenha(event: ChangeEvent<HTMLInputElement>) {
	setConfirmarSenha(event.target.value);
}

async function confirm(event: ChangeEvent<HTMLInputElement>) {
	setVerificar(usuario.nome !== '' && usuario.foto !== '' && senhaError && emailError && usuario.senha == confirmarSenha)
}

function updateModel(event: ChangeEvent<HTMLInputElement>) {
	setUsuario({
			...usuario,
			[event.target.name]: event.target.value,
			});
			setVerificar(
			usuario.nome.length >= 1 && 
			usuario.senha.length >= 8 &&
			usuario.foto.length >= 1
			)}
							 {showPassword ? <VisibilityIcon className="visibilidadeSenha"/> : <VisibilityOff className="visibilidadeSenha"/>}

async function atualizar(event: ChangeEvent<HTMLFormElement>) {
	event.preventDefault();
	if (usuario.senha === confirmarSenha && usuario.senha.length >= 8) {
		try {
			await atualiza('/usuarios/atualizar', usuario, setUsuario, {
headers: {
Authorization: token,
},
});
toast.success('Usuário atualizado com sucesso');
setUsuario({ ...usuario, senha: '' });
setConfirmarSenha('');
} catch (error) {
	toast.error('Falha ao cadastrar o usuário, verifique os campos');
}
} else {
	toast.error('Os campos de Senha e Confirmar Senha estão diferentes');
	setUsuario({ ...usuario, senha: '' });
	setConfirmarSenha('');
}
}

console.log(usuario);

return (
		<>
		<Box marginBottom="169px"/>
		<Grid container alignItems='center' justifyContent='center'>
		<Grid item container xs={8} textAlign="center" alignItems='center' justifyContent='center'>
		<form onSubmit={atualizar} className="usuarioSecaoEditar secao1">
		<Box
		display={'flex'}
		width={'420px'}
		flexDirection={'column'}
		gap={2}
		>
		<Typography className="titulo" variant="h3" textAlign="left" marginBottom="58">Editar Perfil</Typography>
		<Avatar className="usuarioFoto" src={usuario.foto}/>
		<TextField
		name="nome"
		label="Nome"
		value={usuario.nome}
		onChange={(event: ChangeEvent<HTMLInputElement>) =>
			updateModel(event)
		}
/>
<TextField
name="usuario"
label="E-mail"
type="email"
value={usuario.usuario}
onChange={(event: ChangeEvent<HTMLInputElement>) => {
  validateEmail(event)
	updateModel(event)
}}
/>
<TextField
name="foto"
label="Foto"
value={usuario.foto}
onChange={(event: ChangeEvent<HTMLInputElement>) =>
	updateModel(event)
}
/>
<TextField
name="senha"
label="Senha"
type={showPassword ? "text" : "password"}
helperText="Digite a senha para confirmar as alterações"
onChange={(event: ChangeEvent<HTMLInputElement>) => {
validateSenha(event)
	updateModel(event)
}}
sx={{
input: {
color: "var(--laranja)",
			 }
}}
InputProps={{
endAdornment: (
							 <InputAdornment position="end">
							 <IconButton
							 aria-label="toggle password visibility"
							 onClick={handleClickShowPassword}
							 >
							 {showPassword ? <VisibilityIcon className="visibilidadeSenha"/> : <VisibilityOff className="visibilidadeSenha"/>}
							 </IconButton>
							 </InputAdornment>
							)
}}
/>
<TextField
name="confirmarSenha"
label="Confirmar senha"
type={showPassword ? "text" : "password"}
value={confirmarSenha}
onChange={(event: ChangeEvent<HTMLInputElement>) => {
	updateModel(event)
	}
}
sx={{
input: {
color: "var(--laranja)",
			 }
}}
InputProps={{
endAdornment: (
							 <InputAdornment position="end">
							 <IconButton
							 aria-label="toggle password visibility"
							 onClick={handleClickShowPassword}
							 >
							 {showPassword ? <VisibilityIcon className="visibilidadeSenha"/> : <VisibilityOff className="visibilidadeSenha"/>}
							 </IconButton>
							 </InputAdornment>
							)
}}
/>
<Button variant={'contained'} className="btn" disabled={!verificar} type='submit'>Atualizar</Button>
</Box>
</form>
</Grid>
</Grid>
<Grid container alignItems='center' justifyContent='center'>
<Grid xs={9} className="usuarioSecaoProduto">
<Typography className="titulo" variant="h4" marginBottom="58">Meus produtos</Typography>
{usuario.produtos?.map((produto) => (
			<>
			<Box marginBottom="32px"/>
			<Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
			<Card	className="usuarioProduto">
			<CardMedia
			className="filtroProdutoImagem"
			component="img"
			image="https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80"
			/>
			<Box className="filtroProdutoPropriedade">
			<Typography className="filtroProdutoCategoria">
			{produto.categorias?.descricao}
			</Typography>
			<Typography className="filtroProdutoNome">
			{produto.nome} unid.
			</Typography>
			<Grid container className="produtoSecao">
			<Grid item xs={6} textAlign="left">
			<Typography className="filtroProdutoPreco">
			R$ {produto.preco}
			</Typography>
				</Grid>
				<Grid item xs={6} textAlign="right">
				<Link to={`/produtos/${produto.id}`} className="text-decorator-none" >
				<EditIcon className="produtoEditar"/>
				</Link>
				<Link to={`/deletarProduto/${produto.id}`} className="text-decorator-none" >
				<DeleteIcon className="produtoEditar"/>
				</Link>
				</Grid>
				</Grid>
				</Box>
				</Card>
				</Stack>
				</>
				))}
				</Grid>
				</Grid>
				</>
				);
				}

export default Perfil;
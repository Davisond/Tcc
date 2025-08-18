export function setUsuarioLogado(usuario) {
  localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
}

export function getUsuarioLogado() {
  const usuario = localStorage.getItem('usuarioLogado');
  return usuario ? JSON.parse(usuario) : null;
}

export function limparUsuarioLogado() {
  localStorage.removeItem('usuarioLogado');
}

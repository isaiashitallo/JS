import bcrypt from 'https://cdn.jsdelivr.net/npm/bcryptjs@2.4.3/+esm';
// import credenciais from './credenciais';

document.querySelector("form").addEventListener("submit", async (evento) => { //dispara evento qnd submeter o forms
  // preventDefault serve p não recarregar a pg
  evento.preventDefault();

  // valores do forms
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;


  // const senhaUser = "ana.carol";
  // const salt = bcrypt.genSaltSync(10);
  // const hash = bcrypt.hashSync(senhaUser, salt);

  // console.log(senhaUser); // exibe a senha "notebook123" criptografada
  // console.log(hash); // exibe a senha "notebook123" criptografada

  const urlCript = "https://isaiashitallo.github.io/JS/APIs/Prova01/Login02.json";
  const resposta = await fetch(urlCript);
  const usuarios = await resposta.json();

  // ecnontra usuario
  const objUser = usuarios.find(u => u.username === username); // = "wilton123"; // senha do user informada na interface

  // teste deu certo aeeee
  // const senhaJSON = "$2a$10$AIGsnzzlPtyE4ocjSymcguyTXZ/wTjGG/jEPqdfBP09Uh2MtVjJhm";// senha do usuário armazenada no arquivo JSON
  if (bcrypt.compareSync(password, objUser.password)) //"$2a$10$A1IjmLYRXABtcvtq6z4O2unJcbwiQP00n4MCEyFL./6aKzP1eKNwy"))
    alert("senhas iguais"); //(objUser.password);
  else alert("Senhas diferentes"); //(objUser.password);

});


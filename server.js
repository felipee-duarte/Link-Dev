const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/enviar", async (req, res) => {
  const { nome, email, opcao, mensagem } = req.body;

  try {
    // Configura o transporte do e-mail
    let transporter = nodemailer.createTransport({
      service: "gmail", // pode trocar por Outlook, Yahoo etc
      auth: {
        user: "felipeds250x@gmail.com",
        pass: "kpitdqncvpxtbvax"
      }
    });

    // Configura o conteúdo do e-mail
    let mailOptions = {
      from: email,
      to: "felipeds250x@gmail.com",
      subject: `Nova mensagem do formulário: ${opcao}`,
      text: `
        Nome: ${nome}
        Email: ${email}
        Opção: ${opcao}
        Mensagem: ${mensagem}
      `
    };


    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email enviado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao enviar email" });
  }
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));

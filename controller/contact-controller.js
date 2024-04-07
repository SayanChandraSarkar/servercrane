const Crane = require("../models/contact-model");
const nodeMailer = require("nodemailer");
const pdf = require("html-pdf");
const pdfTemplate = require("../document/document");
const pdfTemplates = require("../document/quotation");

const contactData = async (req, res) => {
  try {
    const {
      username,
      email,
      phone,
      company,
      drawing,
      drawingFormat,
      shockAbsorber,
      model,
      price,
      spare,
      series,
      originalPrice,
      currency,
      AdditionalAccessories,
    } = req.body;
    console.log(req.body);
    const createdContact = await Crane.create({
      username,
      email,
      phone,
      company,
      drawing,
      drawingFormat,
      shockAbsorber,
      model,
      price,
      spare,
      series,
      originalPrice,
      currency,
      AdditionalAccessories,
    });
    // const transporter = nodeMailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: "ppratiksharma.2000@gmail.com",
    //     pass: "fiouuyuxcjzetnxz",
    //   },
    // });

    // const mailOptions = {
    //   from: "ppratiksharma.2000@gmail.com",
    //   to: "sledgecoder@gmail.com",
    //   subject: "client details",
    //   text: `
    //    username: ${username},
    //    email: ${email},
    //    phone: ${phone},
    //    company: ${company},
    //    drawing: ${drawing},
    //    shockAbsorber: ${shockAbsorber},
    //    model: ${model},
    //    price: ${price},
    //    spare name: ${spare.name},
    //    spare price: ${spare.price},
    //    series: ${series},
    //    originalPrice: ${originalPrice},
    //    currency: ${currency},
    //    AdditionalAccessories: ${AdditionalAccessories.map(
    //      (accessory) => `
    //    name: ${accessory.name},
    //  `
    //    )}

    // `,

    //   // attachments: [
    //   //   {
    //   //     fileName: "adonitech.pdf",
    //   //     path: "./file/adonitech.pdf",
    //   //   },
    //   // ],
    // };
    // try {
    //   await transporter.sendMail(mailOptions);
    // } catch (error) {
    //   console.error(error);
    // }

    return res
      .status(200)
      .send({ msg: "Message sent Successfully", createdContact });
  } catch (error) {
    return res.status(500).json({ msg: "Message not delivered" });
  }
};

const quotationData = async (req, res) => {
  try {
    const contactId = req.params.id;
    const user = await Crane.findById(contactId);

    if (!user) {
      return res.status(404).json({ msg: "Contact not found" });
    }
    return res
      .status(200)
      .json({ msg: "Quotation data retrieved successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

const technicalPdf = async (req, res) => {
  const { modelName } = req.body;
  let image = "";
  if (modelName.slice(0, 6) === "ED 1.5") {
    image = "https://calculation.cranebuffer.com/image/ED2.0.png";
  } else if (modelName.slice(0, 6) === "ED 2.0") {
    image = "https://calculation.cranebuffer.com/image/ED2.0.png";
  } else if (modelName.slice(0, 6) === "ED 3.0") {
    image = "https://calculation.cranebuffer.com/image/ED3.0.png";
  } else if (modelName.slice(0, 6) === "ED 4.0") {
    image = "https://calculation.cranebuffer.com/image/ED4.0.png";
  } else if (modelName.slice(0, 6) === "ED 3.5") {
    image = "https://calculation.cranebuffer.com/image/ED3.5.png";
  } else if (modelName.slice(0.6) === "EI 50 ") {
    image = "https://calculation.cranebuffer.com/image/EI50.png";
  } else if (modelName.slice(0.6) === "EI 80 ") {
    image = "https://calculation.cranebuffer.com/image/EI50.png";
  } else if (modelName.slice(0.6) === "EI 100") {
    image = "https://calculation.cranebuffer.com/image/EI50.png";
  } else if (modelName.slice(0.6) === "EI 120") {
    image = "https://calculation.cranebuffer.com/image/EI50.png";
  } else if (modelName.slice(0.6) === "EI 130") {
    image = "https://calculation.cranebuffer.com/image/EI130.png";
  } else if (modelName.slice(0.6) === "EI 150") {
    image = "https://calculation.cranebuffer.com/image/EI130.png";
  } else {
    image = "https://calculation.cranebuffer.com/image/SB.png";
  }

  try {
    console.log(req.body);
    pdf
      .create(pdfTemplate(req.body), {})
      .toFile("TechnicalReport.pdf", (err) => {
        if (err) {
          return Promise.reject();
        }
        return Promise.resolve();
      });

    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: "ppratiksharma.2000@gmail.com",
        pass: "fiouuyuxcjzetnxz",
      },
    });
    const mailOptions = {
      from: "ppratiksharma.2000@gmail.com",
      to: "sledgecoder@gmail.com",
      subject: "Technical Report",
      attachments: [
        {
          fileName: "TechnicalReport.pdf",
          path: "./TechnicalReport.pdf",
        },
        {
          fileName: "table.png",
          path: image,
        },
      ],
    };
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ msg: "pdf created successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "pdf not created" });
  }
};

const quotationPdf = async (req, res) => {
  try {
    const { currency } = req.body;
    console.log(currency);
    pdf.create(pdfTemplates(req.body), {}).toFile("Quotation.pdf", (err) => {
      if (err) {
        return Promise.reject();
      }
      return Promise.resolve();
    });

    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: "ppratiksharma.2000@gmail.com",
        pass: "fiouuyuxcjzetnxz",
      },
    });
    const mailOptions = {
      from: "ppratiksharma.2000@gmail.com",
      to: "sledgecoder@gmail.com",
      subject: "Quotation",
      attachments: [
        {
          fileName: "Quotation.pdf",
          path: "./Quotation.pdf",
        },
      ],
    };
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ msg: "pdf created successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "pdf not created" });
  }
};

const getContactData = async (req, res) => {
  try {
    const contacts = await Crane.find();
    return res.status(200).send({ contacts });
  } catch (error) {
    return res.status(500).json({ msg: "Failed to fetch contacts" });
  }
};

const reqForCallBack = async (req, res) => {
  const { phone } = req.body;
  console.log(req.body);
  // if (!email) {
  //   return res.status(400).json({ error: "Please fill all the fields" });
  // }
  try {
    // const userExist = await register.findOne({ email: email });
    // if (!userExist) {
    //   return res.status(400).json({ error: "Invalid Credentials" });
    // }
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: "ppratiksharma.2000@gmail.com",
        pass: "fiouuyuxcjzetnxz",
      },
    });
    const mailOptions = {
      from: "ppratiksharma.2000@gmail.com",
      to: "sledgecoder@gmail.com",
      subject: "Call Back Request",
      // text: `Request for a call back on ${phone}`,
      html: `
        <p style="font-family: Arial, sans-serif; font-size: 16px;">
          <b>Call Back Request</b>
        </p>
        <p style="font-family: Arial, sans-serif; font-size: 14px;">
          Someone has requested a call back. Please contact them at the provided phone number.
        </p>
        <p style="font-family: Arial, sans-serif; font-size: 14px;">
          Phone Number: ${phone}
        </p>
      `,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Request sent" });
  } catch (err) {
    console.log(err);
  }
};

const arrangeMeeting = async (req, res) => {
  const { email, phone, username } = req.body;

  // const email = visit[email];
  // console.log(email);
  // console.log(req.body);
  try {
    // const { phone, username, email } = visit;
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: "ppratiksharma.2000@gmail.com",
        pass: "fiouuyuxcjzetnxz",
      },
    });
    const mailOptions = {
      from: "ppratiksharma.2000@gmail.com",
      to: "sledgecoder@gmail.com",
      subject: "Meeting",
      html: `
      <div style="font-family: Arial, sans-serif; font-size: 16px;">
        <p><strong>Request for a meeting</strong></p>
        <p><strong>Email:</strong>${email}</p>
        <p><strong>Username:</strong> ${username}</p>
        <p><strong>Phone:</strong> ${phone}</p>
      </div>
    `,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Meeting arranged" });
  } catch (err) {
    console.log(err);
  }
};

const passwordResetLink = async (req, res) => {
  try {
    const { email } = req.body;

    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: "ppratiksharma.2000@gmail.com",
        pass: "fiouuyuxcjzetnxz",
      },
    });
    const mailOptions = {
      from: "your_email@gmail.com",
      to: email,
      subject: "Password Reset",
      html: `<p>Click <a href="http://localhost:5173/login/passwordResetConfirm/${email}">here</a> to reset your password</p>`,
    };
    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ msg: "Password reset link sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Failed to send password reset link" });
  }
};

module.exports = {
  contactData,
  quotationData,
  getContactData,
  technicalPdf,
  quotationPdf,
  reqForCallBack,
  arrangeMeeting,
  passwordResetLink,
};

import nodemailer, { Transporter } from 'nodemailer';
import fs from 'fs';
import handlebars from 'handlebars';

class SendMailService {
    private client: Transporter;

    constructor(){
        nodemailer.createTestAccount().then(account => {
            let transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });

            this.client = transporter;
        });
    }

    async execute(to: string, subject: string, htmlVariables: object, templatePath: string) {
        const templateFileContent = fs.readFileSync(templatePath).toString("utf8");
        
        const mailTemplateParse = handlebars.compile(templateFileContent);

        const html = mailTemplateParse(htmlVariables);

        let message = {
            from: 'Sender Name <sender@example.com>',
            to: to,
            subject: subject,
            // text: 'Henllowwww to myself!',
            html
        };

        await this.client.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }
    
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    }
}

export default new SendMailService();
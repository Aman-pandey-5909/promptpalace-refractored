import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SEND_GRID as string);

export const sendMail = async(email: string, subject: string, message: string) => {
    try {
        const msg = {
            to: email,
            from: 'amandbz5909@gmail.com',
            subject: subject,
            text: message,
        }
        await sgMail.send(msg);
    } catch (error) {
        return { error };
    }
}
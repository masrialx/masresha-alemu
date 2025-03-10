import nodemailer from 'nodemailer';

// Define interface for request body
interface EmailRequestBody {
  email: string;
  title: string;
  description: string;
}

// Define interface for API response
interface ApiResponse {
  message: string;
  error?: string;
}

export async function POST(req: Request): Promise<Response> {
  try {
    console.log('Received a request');
    const body: EmailRequestBody = await req.json();
    console.log('Parsed request body:', body);

    const { email, title, description } = body;

    // Validate input
    if (!email || !title || !description) {
      return new Response(
        JSON.stringify({ message: 'All fields (email, title, description) are required.' } as ApiResponse),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ message: 'Invalid email format.' } as ApiResponse),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Verify environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error('Email configuration is missing in environment variables');
    }

    // Create transporter with explicit typing
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log('Transporter created successfully');

    // HTML Email Styling (unchanged)
    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px; box-shadow: 0px 4px 6px rgba(0,0,0,0.1);">
        <div style="text-align: center; padding: 10px 0;">
          <h2 style="color: #2c3e50;">Hello from Masresha Alemu!</h2>
          <p style="font-size: 16px; color: #555;">Professional Software Engineer & AI Enthusiast</p>
        </div>
        <div style="text-align: center; margin-top: 20px;">
          <p style="color: #666; font-size: 14px;">Thank you for reaching out! I appreciate your message and will respond soon.</p>
          <p style="color: #555; font-size: 14px;">Best Regards,<br><strong>Masresha Alemu</strong></p>
        </div>
      </div>
    `;

    const mailOptions: nodemailer.SendMailOptions = {
      from: `"Masresha Alemu" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: title,
      text: description,
      html: emailHTML,
    };

    console.log('Sending email...');
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    return new Response(
      JSON.stringify({ 
        message: 'Thank you for reaching out. I will get back to you soon.' 
      } as ApiResponse),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    
    // Type assertion for error handling
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return new Response(
      JSON.stringify({ 
        message: 'Failed to send email, please try again later.',
        error: errorMessage,
      } as ApiResponse),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}
// netlify/functions/contact.js
const { Resend } = require("resend");

// HTML Email Template for Admin (You)
const getAdminEmailTemplate = (name, email, phone, link, message) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #333;
          line-height: 1.6;
        }
        
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: white;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 40px;
          text-align: center;
        }
        
        .header h1 {
          font-size: 2rem;
          margin-bottom: 10px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .header p {
          font-size: 1.1rem;
          opacity: 0.9;
        }
        
        .content {
          padding: 40px;
        }
        
        .form-data {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 30px;
          margin-bottom: 30px;
          border-left: 4px solid #ff6b6b;
        }
        
        .field {
          margin-bottom: 20px;
        }
        
        .field-label {
          font-weight: 600;
          color: #667eea;
          font-size: 1.1rem;
          margin-bottom: 5px;
          display: block;
        }
        
        .field-value {
          background: white;
          padding: 15px;
          border-radius: 8px;
          border: 2px solid #e9ecef;
          font-size: 1rem;
          color: #333;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        
        .optional-field {
          opacity: 0.8;
        }
        
        .link-field {
          color: #667eea;
          text-decoration: underline;
        }
        
        .footer {
          background: #f8f9fa;
          padding: 30px;
          text-align: center;
          border-top: 1px solid #e9ecef;
        }
        
        .footer p {
          color: #666;
          font-size: 0.9rem;
          margin-bottom: 10px;
        }
        
        .timestamp {
          color: #999;
          font-size: 0.85rem;
          font-style: italic;
        }
        
        .quick-actions {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #e9ecef;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
        }
        
        .action-btn {
          display: inline-block;
          background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
          color: white;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .action-btn:hover {
          background: linear-gradient(45deg, #ff5252, #ff6b6b);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
        }
        
        .action-btn.secondary {
          background: linear-gradient(45deg, #667eea, #764ba2);
        }
        
        .action-btn.secondary:hover {
          background: linear-gradient(45deg, #5a67d8, #6b46c1);
        }
        
        @media (max-width: 600px) {
          .container {
            margin: 0 10px;
          }
          
          .header,
          .content,
          .footer {
            padding: 20px;
          }
          
          .header h1 {
            font-size: 1.5rem;
          }
          
          .form-data {
            padding: 20px;
          }
          
          .quick-actions {
            flex-direction: column;
            align-items: center;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 New Contact Form Submission</h1>
          <p>Someone just reached out through your website!</p>
        </div>
        
        <div class="content">
          <div class="form-data">
            <div class="field">
              <label class="field-label">👤 Name:</label>
              <div class="field-value">${name}</div>
            </div>
            
            <div class="field">
              <label class="field-label">📧 Email:</label>
              <div class="field-value">${email}</div>
            </div>
            
            ${
              phone
                ? `
            <div class="field">
              <label class="field-label">📱 Phone:</label>
              <div class="field-value">${phone}</div>
            </div>
            `
                : ""
            }
            
            ${
              link
                ? `
            <div class="field">
              <label class="field-label">🔗 Website/LinkedIn:</label>
              <div class="field-value">
                <a href="${link}" target="_blank" rel="noopener noreferrer" class="link-field">${link}</a>
              </div>
            </div>
            `
                : ""
            }
            
            <div class="field">
              <label class="field-label">💬 Message:</label>
              <div class="field-value">${message}</div>
            </div>
          </div>
          
          <div class="quick-actions">
            <a href="mailto:${email}" class="action-btn">Reply to ${name}</a>
            ${
              phone
                ? `<a href="tel:${phone}" class="action-btn secondary">Call ${phone}</a>`
                : ""
            }
            ${
              link
                ? `<a href="${link}" target="_blank" rel="noopener noreferrer" class="action-btn secondary">Visit Profile</a>`
                : ""
            }
          </div>
        </div>
        
        <div class="footer">
          <p>This message was sent from your website contact form.</p>
          <p class="timestamp">Received on ${new Date().toLocaleString(
            "en-US",
            {
              timeZone: "Asia/Kolkata",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              timeZoneName: "short",
            }
          )}</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// HTML Email Template for User Confirmation
const getUserConfirmationTemplate = (name) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thanks for reaching out!</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #333;
          line-height: 1.6;
        }
        
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: white;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 40px;
          text-align: center;
        }
        
        .header h1 {
          font-size: 2rem;
          margin-bottom: 10px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .header p {
          font-size: 1.1rem;
          opacity: 0.9;
        }
        
        .content {
          padding: 40px;
        }
        
        .greeting {
          font-size: 1.3rem;
          color: #667eea;
          margin-bottom: 20px;
          font-weight: 600;
        }
        
        .message {
          font-size: 1.1rem;
          line-height: 1.8;
          margin-bottom: 25px;
          color: #555;
        }
        
        .highlight-box {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 25px;
          border-radius: 10px;
          margin: 25px 0;
          text-align: center;
        }
        
        .highlight-box h3 {
          margin-bottom: 10px;
          font-size: 1.4rem;
        }
        
        .highlight-box p {
          font-size: 1rem;
          opacity: 0.9;
        }
        
        .developer-info {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 30px;
          margin: 30px 0;
          border-left: 4px solid #ff6b6b;
        }
        
        .developer-info h3 {
          color: #667eea;
          margin-bottom: 15px;
          font-size: 1.3rem;
        }
        
        .developer-info p {
          margin-bottom: 10px;
          color: #666;
        }
        
        .social-links {
          margin-top: 20px;
          text-align: center;
        }
        
        .social-link {
          display: inline-block;
          background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
          color: white;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          margin: 5px;
          transition: all 0.3s ease;
        }
        
        .social-link:hover {
          background: linear-gradient(45deg, #ff5252, #ff6b6b);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
        }
        
        .footer {
          background: #f8f9fa;
          padding: 30px;
          text-align: center;
          border-top: 1px solid #e9ecef;
        }
        
        .footer p {
          color: #666;
          font-size: 0.9rem;
          margin-bottom: 10px;
        }
        
        .timestamp {
          color: #999;
          font-size: 0.85rem;
          font-style: italic;
        }
        
        @media (max-width: 600px) {
          .container {
            margin: 0 10px;
          }
          
          .header,
          .content,
          .footer {
            padding: 20px;
          }
          
          .header h1 {
            font-size: 1.5rem;
          }
          
          .developer-info {
            padding: 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Message Received!</h1>
          <p>Thanks for reaching out to me</p>
        </div>
        
        <div class="content">
          <div class="greeting">Hi ${name}! 👋</div>
          
          <div class="message">
            Thank you for taking the time to reach out to me through my website. 
            I've received your message and I'm excited to connect with you! I'll get back to you within 24-48 hours.
          </div>
          
          <div class="developer-info">
            <h3>About Me 👨‍💻</h3>
            <p>I'm Darshan Rajashekar, a passionate Backend Engineer and Prompt Engineer who loves building innovative solutions and connecting with like-minded people.</p>
            <p>• Backend Development & API Design</p>
            <p>• Prompt Engineering & AI Integration</p>
            <p>• Full-Stack Web Development</p>
            <p>• Always learning and exploring new technologies</p>
            
            <div class="social-links">
              <a href="https://darshanrajashekar.dev/#calendar" class="social-link">📅 Schedule Call</a>
              <a href="https://darshan-rajashekar.netlify.app" class="social-link">🌐 Visit Website</a>
            </div>
          </div>
          
          <div class="message">
            Feel free to reply to this email if you have any additional questions or information to share. 
            I'm always happy to help and connect with fellow developers, entrepreneurs, and innovators!
          </div>
        </div>
        
        <div class="footer">
          <p>This is an automated confirmation email from Darshan Rajashekar's website.</p>
          <p class="timestamp">Sent on ${new Date().toLocaleString("en-US", {
            timeZone: "Asia/Kolkata",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            timeZoneName: "short",
          })}</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: "Method not allowed" }),
    };
  }

  try {
    const { name, email, phone, link, message } = JSON.parse(event.body);

    // Validate required fields
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          message: "Name, email, and message are required",
        }),
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: "Invalid email format" }),
      };
    }

    // Phone validation (if provided)
    if (phone && phone.trim()) {
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{6,20}$/;
      if (!phoneRegex.test(phone.trim())) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ message: "Invalid phone number format" }),
        };
      }
    }

    // Link validation (if provided)
    if (link && link.trim()) {
      const urlRegex = /^https?:\/\/.+\..+/;
      if (!urlRegex.test(link.trim())) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ message: "Invalid URL format" }),
        };
      }
    }

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send both emails
    const [adminResult, userResult] = await Promise.all([
      // Email to admin (you)
      resend.emails.send({
        from: `${name} via Contact Form <contact@darshanrajashekar.dev>`,
        to: "contact@darshanrajashekar.dev",
        reply_to: email,
        subject: `🚀 New Contact Form Submission from ${name}`,
        html: getAdminEmailTemplate(name, email, phone, link, message),
      }),
      // Confirmation email to user
      resend.emails.send({
        from: "Darshan Rajashekar <contact@darshanrajashekar.dev>",
        to: email,
        subject: `Thanks for reaching out, ${name}! 🎉`,
        html: getUserConfirmationTemplate(name),
      }),
    ]);

    // Check for errors
    if (adminResult.error || userResult.error) {
      console.error("Resend error:", adminResult.error || userResult.error);
      throw new Error("Failed to send email");
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message:
          "Message sent successfully! Check your email for confirmation.",
      }),
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: "Failed to send message. Please try again later.",
      }),
    };
  }
};

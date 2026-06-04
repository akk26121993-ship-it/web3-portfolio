export async function POST(req) {
  try {
    const contentType = req.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
      return Response.json(
        { error: "Request must be JSON" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { name, email, project_type, message } = body;

    if (!name || !email || !message) {
      return Response.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    console.log("Form received:", { name, email, project_type, message });

    // Validate Environment Variables
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS environment variables are missing");
      return Response.json(
        { error: "Server misconfiguration. Cannot send email." },
        { status: 500 }
      );
    }

    const payload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        from_name: name,
        from_email: email,
        project_type: project_type || "General Inquiry",
        message: message,
        reply_to: email,
      },
    };

    if (process.env.EMAILJS_PRIVATE_KEY) {
      payload.accessToken = process.env.EMAILJS_PRIVATE_KEY;
    }

    console.log("Sending payload:", { ...payload, accessToken: "***" });

    // Call EmailJS REST API
    const emailJsResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!emailJsResponse.ok) {
      const errorText = await emailJsResponse.text();
      console.error("EmailJS Delivery Failed:", emailJsResponse.status, errorText);
      return Response.json(
        { error: "Failed to send email. Please try again later.", details: errorText },
        { status: 500 }
      );
    }

    console.log("Email successfully sent via EmailJS");

    return Response.json({
      success: true,
      message: "Form submitted successfully",
    });

  } catch (error) {
    console.error("API Error:", error);

    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
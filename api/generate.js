export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" })

  const { image } = req.body
  const base64Data = image.split(",")[1]

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [
            { inline_data: { mime_type: "image/png", data: base64Data } },
            { text: "You are an AI psychologist. Interpret this drawing and give a brief psychological analysis." }
          ]
        }]
      })
    }
  )

  const data = await response.json()
  
  // Temporary: return the full Gemini response so we can see what's wrong
  return res.status(200).json({ debug: data })
}

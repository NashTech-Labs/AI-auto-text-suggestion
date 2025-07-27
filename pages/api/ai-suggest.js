import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
    const { prompt } = req.body;

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: `Continue this: ${prompt}` }],
            max_tokens: 40,
            temperature: 0.7,
        });

        const suggestion = completion.choices?.[0]?.message?.content?.trim();
        res.status(200).json({ suggestion });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch suggestion' });
    }
}

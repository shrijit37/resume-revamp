const LLM = async (prompt) => {
    try {
        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "qwen/qwen3-coder:free",
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            })
        });
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        console.log(data);
        return data.choices[0]?.message?.content || "No response from model";
    } catch (e) {
        console.log("Error in LLM:", e);
        throw e; // rethrow so caller knows
    }
};

export default LLM;

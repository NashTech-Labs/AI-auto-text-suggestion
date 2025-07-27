import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';

const AIAutoSuggest = () => {
    const [input, setInput] = useState('');
    const [suggestion, setSuggestion] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchSuggestion = useCallback(
        debounce(async (text) => {
            if (!text.trim()) return;

            try {
                setLoading(true);
                const res = await fetch('/api/ai-suggest', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt: text }),
                });

                const data = await res.json();
                setSuggestion(data.suggestion || '');
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }, 800),
        []
    );

    useEffect(() => {
        if (input.length > 5) fetchSuggestion(input);
    }, [input, fetchSuggestion]);

    const handleAccept = () => {
        setInput(input + suggestion);
        setSuggestion('');
    };

    return (
        <div className="space-y-4">
            <label className="block text-gray-700 font-medium">Start writing:</label>
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={6}
                className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type something..."
            />
            {suggestion && (
                <div className="bg-gray-100 p-3 rounded-md border flex items-center justify-between">
                    <p className="text-gray-700 italic">{suggestion}</p>
                    <button
                        onClick={handleAccept}
                        className="ml-4 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                        Accept
                    </button>
                </div>
            )}
            {loading && <p className="text-sm text-gray-400">Thinking...</p>}
        </div>
    );
};

export default AIAutoSuggest;

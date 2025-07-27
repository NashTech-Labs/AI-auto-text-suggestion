import React from 'react';
import AIAutoSuggest from '../components/AIAutoSuggest';

const SuggestPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="bg-white shadow-lg rounded-xl p-6 max-w-2xl w-full">
                <h1 className="text-xl font-bold mb-4">AI Text Suggest</h1>
                <AIAutoSuggest />
            </div>
        </div>
    );
};

export default SuggestPage;

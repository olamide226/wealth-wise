// src/mockData.js
export default {
    transactions: [
        { date: '2023-10-26', description: 'Grocery Store', category: 'Food', amount: -50 },
        { date: '2023-10-25', description: 'Utilities', category: 'Electricity', amount: -120 },
        { date: '2023-10-24', description: 'Salary', category: 'Income', amount: 2000 },
        { date: '2023-10-23', description: 'Gas Station', category: 'Transportation', amount: -40 },
        { date: '2023-10-22', description: 'Coffee Shop', category: 'Dining', amount: -5 },
        { date: '2023-10-21', description: 'Phone Bill', category: 'Utilities', amount: -60 },
        { date: '2023-10-20', description: 'Freelance Work', category: 'Income', amount: 500 },
        // ... more transactions
    ],
    goals: [
        {
            name: "Emergency Fund",
            totalAmount: 1500,
            currentAmount: 675,
            timeframe: 6, // Add timeframe (in months)
            monthlySaving: 0, // Initially 0, will be calculated
        },
        // ... more goals
    ],
    spendingTrend: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [120, 85, 150, 90, 110, 75, 130], // Example spending data
    },
    aiInsights: [
        {
            insight:
                "Based on your goal of saving $10,000 in 24 months, it's recommended to save approximately $417 per month.",
        },
        {
            insight:
                "You're currently spending a significant portion on dining out. Consider reducing this to accelerate your savings.",
        },
    ],
    financialTopics: {
        SPENDING: ['spending', 'expenses', 'costs', 'bills'],
        SAVING: ['saving', 'savings', 'save'],
        INVESTING: ['invest', 'investment', 'stocks', 'bonds'],
        DEBT: ['debt', 'loan', 'credit'],
        GOALS: ['goal', 'target', 'plan'],
        DNA: ['dna', 'profile', 'personality'],
        BUDGET: ['budget', 'allocate', 'planning']
    }
};



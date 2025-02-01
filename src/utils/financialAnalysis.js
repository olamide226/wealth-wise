export const getTopCategory = (transactions) => {
    const categories = transactions.reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
        return acc;
    }, {});
    
    return Object.entries(categories)
        .sort(([,a], [,b]) => b - a)[0][0];
};

export const calculateSavingsRate = (transactions) => {
    const income = transactions
        .filter(t => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = transactions
        .filter(t => t.amount < 0)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    return Math.round((income - expenses) / income * 100);
};

export const getStrongestTrait = (dnaProfile) => {
    if (!dnaProfile?.strands) return 'Unknown';
    
    return Object.entries(dnaProfile.strands)
        .sort(([,a], [,b]) => b - a)[0][0];
};

export const getSavingAdvice = (rate) => {
    if (rate >= 20) return "Great job! You're saving at an excellent rate.";
    if (rate >= 10) return "You're on track, but could improve your savings rate.";
    return "Consider increasing your savings rate to at least 10%.";
};
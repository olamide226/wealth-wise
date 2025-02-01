export class FinancialDNA {
    constructor() {
        this.categories = {
            risk: {
                // Updated to a more distinct red shade.
                color: '#E74C3C',
                strands: ['riskTolerance', 'securityImportance']
            },
            savings: {
                // Updated to a more distinct turquoise.
                color: '#1ABC9C',
                strands: ['savingBehavior', 'spendingStyle']
            },
            investment: {
                // Updated to a vibrant blue.
                color: '#3498DB',
                strands: ['investmentApproach']
            },
            debt: {
                // Updated to a bright yellow.
                color: '#F1C40F',
                strands: ['debtManagement', 'debtAttitude']
            }
        };
        this.strands = {
            riskTolerance: 0,
            savingBehavior: 0,
            spendingStyle: 0,
            investmentApproach: 0,
            debtManagement: 0,
            securityImportance: 0,
            debtAttitude: 0,
        };
        this.evolution = [];
    }

    calculateProfile(answers) {
        // Calculate DNA strand values from questionnaire
        Object.keys(this.strands).forEach(strand => {
            this.strands[strand] = this.evaluateStrand(answers, strand);
        });
    }

    evaluateStrand(answers, strand) {
        // Map answers to 0-100 scale.
        return Math.min(Math.max(answers[strand] * 20, 0), 100);
    }

    evolve(interaction) {
        // Track DNA changes based on user actions.
        this.evolution.push({
            date: new Date(),
            changes: interaction
        });
    }

    getCategoryForStrand(strand) {
        return Object.entries(this.categories).find(([_, category]) =>
            category.strands.includes(strand)
        )?.[0];
    }
}
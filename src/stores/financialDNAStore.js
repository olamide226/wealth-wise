import { defineStore } from 'pinia'

export const useFinancialDNAStore = defineStore('financialDNA', {
    state: () => ({
        answers: {},
        dnaProfile: null,
        showVisualization: false
    }),

    actions: {
        setAnswers(answers) {
            this.answers = answers
            localStorage.setItem('dna-answers', JSON.stringify(answers))
        },

        setDNAProfile(profile) {
            this.dnaProfile = profile
            localStorage.setItem('dna-profile', JSON.stringify(profile))
        },

        hydrate() {
            const answers = localStorage.getItem('dna-answers')
            const profile = localStorage.getItem('dna-profile')

            if (answers) this.answers = JSON.parse(answers)
            if (profile) {
                this.dnaProfile = JSON.parse(profile)
                this.showVisualization = true
            }
        }
    }
})
import { useState, useEffect } from 'react'

const useBudgetApp = () => {
	// --- USESTATE --- //
	const [incomeData, setIncomeData] = useState(
		JSON.parse(localStorage.getItem('incomeData')) || {}
	)
	const [variableExpenses, setVariableExpenses] = useState(
		JSON.parse(localStorage.getItem('variableExpenses')) || []
	)
	const [fixedExpenses, setFixedExpenses] = useState(
		JSON.parse(localStorage.getItem('fixedExpenses')) || []
	)
	const [domesticExpenses, setDomesticExpenses] = useState(
		JSON.parse(localStorage.getItem('domesticExpenses')) || []
	)
	const [totalVariableExpenses, setTotalVariableExpenses] = useState(
		JSON.parse(localStorage.getItem('totalVariableExpenses')) || 0
	)
	const [totalFixedExpenses, setTotalFixedExpenses] = useState(
		JSON.parse(localStorage.getItem('totalFixedExpenses')) || 0
	)
	const [totalDomesticExpenses, setTotalDomesticExpenses] = useState(
		JSON.parse(localStorage.getItem('totalDomesticExpenses')) || 0
	)
	const [totalProfessionalExpenses, setTotalProfessionalExpenses] = useState(
		JSON.parse(localStorage.getItem('totalProfessionalExpenses')) || 0
	)
	const [salary, setSalary] = useState(
		JSON.parse(localStorage.getItem('salary')) || 0
	)
	const [profit, setProfit] = useState(
		JSON.parse(localStorage.getItem('profit')) || 0
	)

	// --- USEFFECT --- //

	// AJOUT DES REVENUS A LOCALSTORAGE CHAQUE FOIS QUE CES DERNIERS SONT CHANGES PAR L'USER
	useEffect(() => {
		if (Object.keys(incomeData).length) {
			localStorage.setItem('incomeData', JSON.stringify(incomeData))
		}
	}, [incomeData])

	// AJOUT D'UNE CHARGE VARIABLE A LOCALSTORAGE
	useEffect(() => {
		const calculateVariableExpenses = () => {
			const variableExpensesPercent = variableExpenses.reduce(
				(acc, cur) => acc + Number(cur.expenseAmount),
				0
			)
			const totalVariableExpense =
				(incomeData.monthlyIncome * variableExpensesPercent) / 100
			setTotalVariableExpenses(totalVariableExpense)
			return totalVariableExpense
		}

		calculateVariableExpenses()
		localStorage.setItem(
			'totalVariableExpenses',
			JSON.stringify(calculateVariableExpenses())
		)

		localStorage.setItem('variableExpenses', JSON.stringify(variableExpenses))
	}, [incomeData, variableExpenses])

	// AJOUT D'UNE CHARGE FIXE A LOCALSTORAGE + CALCUL DU TOTAL DES CHARGES FIXES ET AJOUT DE CE TOTAL A LOCALSTORAGE
	useEffect(() => {
		const calculateFixedExpenses = () => {
			const totalFixedExpense = fixedExpenses.reduce(
				(acc, cur) => acc + Number(cur.expenseAmount),
				0
			)
			setTotalFixedExpenses(totalFixedExpense)
			return totalFixedExpense
		}

		calculateFixedExpenses()

		localStorage.setItem('fixedExpenses', JSON.stringify(fixedExpenses))
		localStorage.setItem(
			'totalFixedExpenses',
			JSON.stringify(calculateFixedExpenses())
		)
	}, [fixedExpenses])

	// AJOUT D'UNE CHARGE DOMESTIQUE A LOCALSTORAGE + CALCUL DU TOTAL DES CHARGES DOMESTIQUES ET AJOUT DE CE TOTAL A LOCALSTORAGE
	useEffect(() => {
		const calculateDomesticExpenses = () => {
			const totalDomesticExpense = domesticExpenses.reduce(
				(acc, cur) => acc + Number(cur.expenseAmount),
				0
			)
			setTotalDomesticExpenses(totalDomesticExpense)
			return totalDomesticExpense
		}

		calculateDomesticExpenses()

		localStorage.setItem('domesticExpenses', JSON.stringify(domesticExpenses))
		localStorage.setItem(
			'totalDomesticExpenses',
			JSON.stringify(calculateDomesticExpenses())
		)
	}, [domesticExpenses])

	// AJOUT D'UNE CHARGE PROFESSIONNELLE A LOCALSTORAGE + CALCUL DU TOTAL DES CHARGES PROFESSIONNELLES ET AJOUT DE CE TOTAL A LOCALSTORAGE
	useEffect(() => {
		const calculateTotalProfessionalExpenses = () => {
			const totalProfessionalExpenses =
				totalVariableExpenses + totalFixedExpenses
			setTotalProfessionalExpenses(totalProfessionalExpenses)
			return totalProfessionalExpenses
		}
		if (Object.keys(incomeData).length) {
			calculateTotalProfessionalExpenses()

			localStorage.setItem(
				'totalProfessionalExpenses',
				JSON.stringify(calculateTotalProfessionalExpenses())
			)
		}
	}, [incomeData, totalVariableExpenses, totalFixedExpenses])

	// CALCUL DU SALAIRE ET AJOUT DU SALAIRE A LOCALSTORAGE
	useEffect(() => {
		if (Object.keys(incomeData).length) {
			const calculateSalary = () => {
				const salary =
					incomeData.monthlyIncome - totalVariableExpenses - totalFixedExpenses
				setSalary(salary)
				return salary
			}

			calculateSalary()

			localStorage.setItem('salary', JSON.stringify(calculateSalary()))
		}
	}, [incomeData, totalVariableExpenses, totalFixedExpenses])

	// CALCUL DU BENEFICE ET AJOUT DU BENEFICE A LOCALSTORAGE
	useEffect(() => {
		if (Object.keys(incomeData).length) {
			const calculateProfit = () => {
				const profit =
					incomeData.monthlyIncome -
					totalVariableExpenses -
					totalFixedExpenses -
					totalDomesticExpenses
				setProfit(profit)
				return profit
			}

			calculateProfit()

			localStorage.setItem('profit', JSON.stringify(calculateProfit()))
		}
	}, [
		incomeData,
		totalVariableExpenses,
		totalFixedExpenses,
		totalDomesticExpenses,
	])

	//
	// --- FONCTIONS --- //
	//

	// AJOUT DU NOMBRE DE JOUR TRAVAILLES ET DU REVENU JOURNALIER + CALCUL DU CA JOURNALIER + AJOUT DU TOUT A LOCALSTORAGE
	const addIncomeData = incomeData => {
		const { daysWorked, dailyIncome } = incomeData
		const monthlyIncome = daysWorked * dailyIncome
		setIncomeData({
			daysWorked,
			dailyIncome,
			monthlyIncome,
		})
	}

	// AJOUTER UNE CHARGE VARIABLE
	const addVariableExpense = incomeData => {
		setVariableExpenses(prevVariableExpenses => [
			...prevVariableExpenses,
			incomeData,
		])
	}

	// AJOUTER UNE CHARGE FIXE
	const addFixedExpense = incomeData => {
		setFixedExpenses(prevFixedExpenses => [...prevFixedExpenses, incomeData])
	}

	// AJOUTER UNE CHARGE DOMESTIQUE
	const addDomesticExpense = incomeData => {
		setDomesticExpenses(prevDomesticExpenses => [
			...prevDomesticExpenses,
			incomeData,
		])
	}

	// SUPPRIMER UNE CHARGE
	const deleteTask = (id, expenseType) => {
		if (expenseType === 'variable') {
			setVariableExpenses(prevTypeExpenses =>
				prevTypeExpenses.filter(item => item.id !== id)
			)
		}

		if (expenseType === 'fixed') {
			setFixedExpenses(prevTypeExpenses =>
				prevTypeExpenses.filter(item => item.id !== id)
			)
		}

		if (expenseType === 'domestic') {
			setDomesticExpenses(prevTypeExpenses =>
				prevTypeExpenses.filter(item => item.id !== id)
			)
		}

		console.log(id, expenseType)
	}

	return {
		incomeData,
		variableExpenses,
		fixedExpenses,
		domesticExpenses,
		totalVariableExpenses,
		totalFixedExpenses,
		totalDomesticExpenses,
		totalProfessionalExpenses,
		salary,
		profit,
		addIncomeData,
		addVariableExpense,
		addFixedExpense,
		addDomesticExpense,
		deleteTask,
	}
}

export default useBudgetApp

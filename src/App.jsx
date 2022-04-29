import React, { useEffect, useState } from 'react'
import './App.css'

import IncomeForm from './components/IncomeForm'
import ExpensesForm from './components/ExpensesForm'
import BalanceContainer from './components/BalanceContainer'

function App() {
	// --- USESTATE --- //
	const [incomeData, setIncomeData] = React.useState(
		JSON.parse(localStorage.getItem('incomeData')) || {}
	)
	const [variableExpenses, setVariableExpenses] = React.useState(
		JSON.parse(localStorage.getItem('variableExpenses')) || []
	)
	const [fixedExpenses, setFixedExpenses] = React.useState(
		JSON.parse(localStorage.getItem('fixedExpenses')) || []
	)
	const [domesticExpenses, setDomesticExpenses] = React.useState(
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
		localStorage.setItem('incomeData', JSON.stringify(incomeData))
	}, [incomeData])

	// AJOUT D'UNE CHARGE VARIABLE A LOCALSTORAGE
	useEffect(() => {
		if (incomeData.monthlyIncome) {
			calculateVariableExpenses()
			localStorage.setItem(
				'totalVariableExpenses',
				JSON.stringify(calculateVariableExpenses())
			)
		}

		localStorage.setItem('variableExpenses', JSON.stringify(variableExpenses))
	}, [variableExpenses])

	// AJOUT D'UNE CHARGE FIXE A LOCALSTORAGE
	useEffect(() => {
		calculateFixedExpenses()
		localStorage.setItem('fixedExpenses', JSON.stringify(fixedExpenses))
		localStorage.setItem(
			'totalFixedExpenses',
			JSON.stringify(calculateFixedExpenses())
		)
	}, [fixedExpenses])

	// AJOUT D'UNE CHARGE DOMESTIQUE A LOCALSTORAGE
	useEffect(() => {
		calculateDomesticExpenses()
		localStorage.setItem('domesticExpenses', JSON.stringify(domesticExpenses))
		localStorage.setItem(
			'totalDomesticExpenses',
			JSON.stringify(calculateDomesticExpenses())
		)
	}, [domesticExpenses])

	// AJOUT DU TOTAL DES CHARGES PROFESIONNELLES A LOCALSTORAGE
	useEffect(() => {
		calculateTotalProfessionalExpenses()
		localStorage.setItem(
			'totalProfessionalExpenses',
			JSON.stringify(calculateTotalProfessionalExpenses())
		)
	}, [incomeData, totalVariableExpenses, totalFixedExpenses])

	// AJOUT DU SALAIRE A LOCALSTORAGE
	useEffect(() => {
		if (Object.keys(incomeData).length) {
			calculateSalary()
			localStorage.setItem('salary', JSON.stringify(calculateSalary()))
		}
	}, [incomeData, totalVariableExpenses, totalFixedExpenses])

	// AJOUT DU BENEFICE A LOCALSTORAGE
	useEffect(() => {
		calculateProfit()
		localStorage.setItem('profit', JSON.stringify(calculateProfit()))
	}, [
		incomeData,
		totalVariableExpenses,
		totalFixedExpenses,
		totalDomesticExpenses,
	])

	//
	// --- FONCTIONS --- //
	//

	// CALCUL DU CHIFFRE D'AFFAIRE
	const calculateMonthlyIncome = incomeData => {
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

	// CALCULER LES CHARGES VARIABLES
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

	// CALCULERLES CHARGES FIXES
	const calculateFixedExpenses = () => {
		const totalFixedExpense = fixedExpenses.reduce(
			(acc, cur) => acc + Number(cur.expenseAmount),
			0
		)
		setTotalFixedExpenses(totalFixedExpense)
		return totalFixedExpense
	}

	// CALCULER LES CHARGES DOMESTIQUES
	const calculateDomesticExpenses = () => {
		const totalDomesticExpense = domesticExpenses.reduce(
			(acc, cur) => acc + Number(cur.expenseAmount),
			0
		)
		setTotalDomesticExpenses(totalDomesticExpense)
		return totalDomesticExpense
	}

	// CALCULER LE TOTAL DES CHARGES PRO
	const calculateTotalProfessionalExpenses = () => {
		const totalProfessionalExpenses =
			totalVariableExpenses + totalFixedExpenses + totalDomesticExpenses
		setTotalProfessionalExpenses(totalProfessionalExpenses)
		return totalProfessionalExpenses
	}

	// CALCULER LE SALAIRE NET
	const calculateSalary = () => {
		const salary =
			incomeData.monthlyIncome - totalVariableExpenses - totalFixedExpenses
		setSalary(salary)
		return salary
	}

	// CALCULER LE BENEFICE
	const calculateProfit = () => {
		const profit =
			incomeData.monthlyIncome -
			totalVariableExpenses -
			totalFixedExpenses -
			totalDomesticExpenses
		setProfit(profit)
		return profit
	}

	// // Supprimer une charge
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
	}

	return (
		<main>
			<div className='forms-container'>
				<IncomeForm onSubmit={calculateMonthlyIncome} incomeData={incomeData} />

				<ExpensesForm
					title='Charges Variables'
					onSubmit={addVariableExpense}
					totalExpenses={totalVariableExpenses}
					expenses={variableExpenses}
					show={Object.keys(incomeData).length && 'show'}
					onDelete={deleteTask}
					expenseType='variable'
				/>

				<ExpensesForm
					title='Charges Fixes'
					onSubmit={addFixedExpense}
					totalExpenses={totalFixedExpenses}
					expenses={fixedExpenses}
					show={(totalVariableExpenses || totalFixedExpenses) && 'show'}
					onDelete={deleteTask}
					expenseType='fixed'
				/>

				<ExpensesForm
					title='Charges Domestiques'
					onSubmit={addDomesticExpense}
					totalExpenses={totalDomesticExpenses}
					expenses={domesticExpenses}
					show={(totalFixedExpenses || totalDomesticExpenses) && 'show'}
					onDelete={deleteTask}
					expenseType='domestic'
				/>
			</div>
			<BalanceContainer
				incomeData={incomeData}
				totalProfessionalExpenses={totalProfessionalExpenses}
				salary={salary}
				profit={profit}
				show={totalProfessionalExpenses && 'show'}
			/>
		</main>
	)
}

export default App

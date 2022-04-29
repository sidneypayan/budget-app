import IncomeForm from './components/IncomeForm'
import ExpensesForm from './components/ExpensesForm'
import BalanceContainer from './components/BalanceContainer'
import useBudgetApp from './hooks/useBudgetApp'

function App() {
	const {
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
	} = useBudgetApp()

	return (
		<main>
			<div className='forms-container'>
				<IncomeForm onSubmit={addIncomeData} incomeData={incomeData} />

				<ExpensesForm
					title='Charges Variables'
					onSubmit={addVariableExpense}
					totalExpenses={totalVariableExpenses}
					expenses={variableExpenses}
					show={Object.keys(incomeData).length && 'show'}
					onDelete={deleteTask}
					expenseType='variables'
				/>

				<ExpensesForm
					title='Charges Fixes'
					onSubmit={addFixedExpense}
					totalExpenses={totalFixedExpenses}
					expenses={fixedExpenses}
					show={(totalVariableExpenses || totalFixedExpenses) && 'show'}
					onDelete={deleteTask}
					expenseType='fixes'
				/>

				<ExpensesForm
					title='Charges Domestiques'
					onSubmit={addDomesticExpense}
					totalExpenses={totalDomesticExpenses}
					expenses={domesticExpenses}
					show={(totalFixedExpenses || totalDomesticExpenses) && 'show'}
					onDelete={deleteTask}
					expenseType='domestiques'
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

import React from 'react'

const ExpensesContainer = ({ expenseType, onDelete, expenses }) => {
	const handleClick = (id, expenseType) => {
		onDelete(id, expenseType)
	}

	return (
		<>
			{expenses &&
				expenses.map(expense => (
					<div className='fixed-charges' key={expense.id}>
						<span className='charge-type'>{expense.expenseName}</span> :{' '}
						<span className='number'>
							{expense.expenseAmount}
							{expenseType === 'variable' && '%'}
						</span>
						<i
							className='fas fa-trash-alt delete'
							aria-hidden='true'
							onClick={() => handleClick(expense.id, expenseType)}></i>
					</div>
				))}
		</>
	)
}

export default ExpensesContainer

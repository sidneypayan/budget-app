import { useState, useRef } from 'react'
import ExpensesContainer from './ExpensesContainer'
import { nanoid } from 'nanoid'

const ExpensesForm = ({
	title,
	expenseType,
	expenses,
	totalExpenses,
	onSubmit,
	show,
	onDelete,
}) => {
	const [formData, setFormData] = useState({
		expenseName: '',
		expenseAmount: '',
	})

	const inputRef = useRef(null)

	const handleChange = e => {
		const { name, value } = e.target
		setFormData(prevFormData => {
			return {
				...prevFormData,
				[name]: value,
			}
		})
	}

	const handleSubmit = e => {
		e.preventDefault()
		if (formData.expenseName && formData.expenseAmount) {
			onSubmit({
				id: nanoid(),
				expenseName: formData.expenseName,
				expenseAmount: formData.expenseAmount,
			})
			setFormData({
				expenseName: '',
				expenseAmount: '',
			})
			inputRef.current.focus()
		} else {
			alert('Veuillez remplir le formulaire')
		}
	}

	return (
		<div className='form-container'>
			<form
				className={`form ExpensesForm ${show && 'show'}`}
				onSubmit={handleSubmit}>
				<h2>{title}</h2>
				<div className='form-input'>
					<label htmlFor='expenseName'>Charge</label>
					<input
						type='text'
						id='expenseName'
						name='expenseName'
						ref={inputRef}
						value={formData.expenseName}
						onChange={handleChange}
					/>
				</div>
				<div className='form-input'>
					<label htmlFor='expenseAmount'>
						Montant {expenseType === 'variable' && '(% du CA)'}
					</label>
					<input
						type='number'
						id='expenseAmount'
						name='expenseAmount'
						value={formData.expenseAmount}
						onChange={handleChange}
					/>
				</div>
				<button>Ajouter</button>
			</form>

			<ExpensesContainer
				expenseType={expenseType}
				onDelete={onDelete}
				expenses={expenses}
			/>

			{expenseType === 'variable' && totalExpenses ? (
				<div className='gross-income'>
					Total charges variables : {totalExpenses}
				</div>
			) : (
				''
			)}

			{expenseType === 'fixed' && totalExpenses ? (
				<div className='gross-income'>
					Total charges fixes : {totalExpenses}
				</div>
			) : (
				''
			)}

			{expenseType === 'domestic' && totalExpenses ? (
				<div className='gross-income'>
					Total charges domestiques : {totalExpenses}
				</div>
			) : (
				''
			)}
		</div>
	)
}

export default ExpensesForm

import { useState, useRef } from 'react'

const IncomeForm = ({ incomeData, onSubmit }) => {
	const [formData, setFormData] = useState({
		daysWorked: '',
		dailyIncome: '',
	})

	const inputRef = useRef(null)

	const handleSubmit = e => {
		if (formData.daysWorked && formData.dailyIncome) {
			e.preventDefault()
			onSubmit(formData)
			formData.daysWorked = ''
			formData.dailyIncome = ''
			inputRef.current.focus()
		} else {
			alert('Veuillez remplir le formulaire')
		}
	}

	const handleChange = e => {
		const { name, value } = e.target

		setFormData(prevData => ({
			...prevData,
			[name]: value,
		}))
	}

	return (
		<div className='form-container'>
			<form className='form' onSubmit={handleSubmit}>
				<h2>Jours travaillés</h2>
				<div className='form-input'>
					<label htmlFor='daysWorked'>Nombre de jours travaillés / mois</label>
					<input
						ref={inputRef}
						type='number'
						id='daysWorked'
						name='daysWorked'
						value={formData.daysWorked}
						onChange={handleChange}
					/>
				</div>
				<div className='form-input'>
					<label htmlFor='dailyIncome'>CA / jour</label>
					<input
						type='number'
						id='dailyIncome'
						name='dailyIncome'
						value={formData.dailyIncome}
						onChange={handleChange}
					/>
				</div>
				<button>Ajouter</button>
			</form>

			{incomeData.monthlyIncome && (
				<>
					<div className='fixed-charges'>
						Jours travaillés : {incomeData.daysWorked}{' '}
					</div>
					<div className='fixed-charges'>
						CA journalier : {incomeData.dailyIncome}{' '}
					</div>
					<div className='gross-income'>
						Revenu Brut : {incomeData.monthlyIncome}
					</div>
				</>
			)}
		</div>
	)
}

export default IncomeForm

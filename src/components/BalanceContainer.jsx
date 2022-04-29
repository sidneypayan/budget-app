import React from 'react'

const BalanceContainer = ({
	incomeData,
	totalProfessionalExpenses,
	salary,
	profit,
}) => {
	return (
		<div className={`expenses ${incomeData.monthlyIncome && 'show'}`}>
			<div className='total-charges'>
				<span>Total charges professionnelles</span> :{' '}
				<span>{Math.round(totalProfessionalExpenses * 100) / 100}</span>
			</div>
			<div className='total-charges'>
				<span>Salaire net</span> : <span>{Math.round(salary * 100) / 100}</span>
			</div>
			<div className='saving'>
				<span>Epargne</span> : <span>{Math.round(profit * 100) / 100}</span>
			</div>
		</div>
	)
}

export default BalanceContainer

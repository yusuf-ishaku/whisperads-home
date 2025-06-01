"use client"

import React from 'react'
import AgentWallet from '@/components/dashboard/AgentWallet'

function page() {
    const [balanceVisible, setBalanceVisible] = React.useState<boolean>(false);
    const [amount, setAmount] = React.useState<string>('');
    const [accountNumber, setAccountNumber] = React.useState<string>('');

    const handleConfirmWithdrawal = () => {
        
        console.log('Withdrawal confirmed:', { amount, accountNumber });
    };

  return (
    <div>
        <AgentWallet onConfirm={handleConfirmWithdrawal}
                amount={amount}
                setAmount={setAmount}
                accountNumber={accountNumber}
                setAccountNumber={setAccountNumber}
                balanceVisible={balanceVisible}
                setBalanceVisible={setBalanceVisible}/>
    </div>
  )
}

export default page
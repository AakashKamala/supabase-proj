import React, { useState } from 'react'
import { supabase } from './supabase'
import "./common.css"

const Owner = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (!email || !password) {
      setError('Both fields are required')
      return
    }

    // Check if the email exists in the owner table
    const { data: ownerData, error: ownerError } = await supabase
      .from('owner')
      .select('email')
      .eq('email', email)

    // Check if the email exists in the trader table
    const { data: traderData, error: traderError } = await supabase
      .from('trader')
      .select('email')
      .eq('email', email)

    if (ownerError || traderError) {
      setError('Error fetching data')
      return
    }

    // Prevent registration if email exists in either table
    if ((ownerData && ownerData.length > 0) || (traderData && traderData.length > 0)) {
      setError('Email is already registered as either a trader or an owner')
      return
    }

    // Insert the new owner record
    const { error: insertError } = await supabase
      .from('owner')
      .insert([{ email, password }])

    if (insertError) {
      setError(insertError.message)
    } else {
      setSuccess(true)
    }
  }

  return (
    <div>
      <h1>Owner</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Owner added successfully</p>}
    </div>
  )
}

export default Owner
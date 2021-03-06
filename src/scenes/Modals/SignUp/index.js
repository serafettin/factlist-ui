import React from 'react'
import Modal from 'components/Modal'
import SignUpForm from 'containers/Forms/SignUp'

const SignUpModal = ({ onClose }) => (
  <Modal onClose={onClose}>
    <SignUpForm />
  </Modal>
)

export default SignUpModal

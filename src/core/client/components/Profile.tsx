import { auth } from '@src/core/client/lib/auth'
import { SignIn } from './SignIn'
import { SignUp } from './SignUp'

export function Profile() {
  const { data: session, isPending, error, refetch } = auth.useSession()

  if (isPending) {
    return <div>Loading...</div>
  }

  if (error) {
    return (
      <div>
        Error:
        {error.message}
      </div>
    )
  }

  if (!session) {
    return (
      <div>
        <SignUp />
        <hr />
        <SignIn />
      </div>
    )
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>
        Email:
        {session.user.email}
      </p>
      <p>
        Username:
        {session.user.name}
      </p>
      <button onClick={() => auth.signOut()}>Sign Out</button>
      <button onClick={() => refetch()}>Refresh Session</button>
    </div>
  )
}

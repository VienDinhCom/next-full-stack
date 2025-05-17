import { SignIn } from '@src/shared/components/sign-in'
import { SignUp } from '@src/shared/components/sign-up'
import { authClient } from '@src/shared/lib/auth'

export function Profile() {
  const { data: session, isPending, error, refetch } = authClient.useSession()

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
      <button onClick={() => authClient.signOut()}>Sign Out</button>
      <button onClick={() => refetch()}>Refresh Session</button>
    </div>
  )
}

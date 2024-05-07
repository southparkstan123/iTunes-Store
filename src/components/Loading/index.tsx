import { useIntl } from 'react-intl';
const Loading = () => {

  const intl = useIntl();
  return (
    <div className="min-h-screen max-w-lg mx-auto flex items-center justify-center">
      <h1 className="text-center text-2xl text-primary">
        {intl.messages['loading.message'] as string}
      </h1>
    </div>
  )
}

export default Loading;
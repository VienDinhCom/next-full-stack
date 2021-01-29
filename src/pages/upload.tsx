import { useState } from 'react';
import { DefaultLayout } from '@frontend/components/Layouts/DefaultLayout';
import { ApiService, useMuation, getFiles, File } from '@frontend/services/api.service';

export default function Page() {
  const [file, setFile] = useState<File>();

  const { loading, data, error, mutate } = useMuation(async (file: File) => {
    return ApiService.file.upload({ file });
  });

  return (
    <DefaultLayout>
      <h1>Upload Files</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (file) mutate(file);
        }}
      >
        <input
          type="file"
          onChange={(event) => {
            const files = getFiles(event.currentTarget.files);
            setFile(files[0]);
          }}
        />
        <br />
        {error && <p>Error: {error.message}</p>}
        {data && (
          <p>
            <b>{data}</b> is uploaded!
          </p>
        )}
        <p>
          <button type="submit">{loading ? 'Uploading...' : 'Upload Now!'}</button>
        </p>
      </form>
    </DefaultLayout>
  );
}

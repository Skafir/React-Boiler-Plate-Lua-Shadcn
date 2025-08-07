import React, { useState } from 'react';
import { debugData } from "@/utils/debugData";
import { fetchNui } from "@/utils/fetchNui";

import { Button } from "@/components/ui/button"

// This will set the NUI to visible if we are
// developing in browser

debugData([
  {
    action: 'setVisible',
    data: true,
  }
])

interface ReturnClientDataCompProps {
  data: any
}

const ReturnClientDataComp: React.FC<ReturnClientDataCompProps> = ({ data }) => (
  <>
    <pre className='bg-stone-900 p-3 rounded-lg text-white m-3'>
      <code> Returned Data : {JSON.stringify(data, null)} </code>
    </pre>
  </>
)

interface ReturnData {
  x: number;
  y: number;
  z: number;
}

const App: React.FC = () => {
  const [clientData, setClientData] = useState<ReturnData | null>(null)

  const handleGetClientData = () => {
    fetchNui<ReturnData>('getClientData').then(retData => {
      console.log('Got return data from client scripts :')
      console.dir(retData)
      setClientData(retData)
    }).catch(e => {
      console.error('Setting mock data due to error', e)
      setClientData({ x: 500, y: 300, z: 200 })
    })
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <div className='bg-stone-800 rounded-xl w-[700px] h-[400px] flex justify-center items-center text-white text-center'>
        <div>
          <h1 className='text-lg font-medium'>This is the NUI Popup !</h1>
          <p className='text-base font-medium pb-2'>Exit with the escape key</p>
          <Button onClick={handleGetClientData}>Get Client Data</Button>
          {clientData && <ReturnClientDataComp data={clientData} />}
        </div>
      </div>
    </div>
  );
}

export default App;

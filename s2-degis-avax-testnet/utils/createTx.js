
import Tx from 'ethereumjs-tx';

export function createTx(txObject, pvt) {
  const usePvt = Buffer.from(pvt, 'hex');
  const tx = new Tx(txObject)
  tx.sign(usePvt);
  const serializedTx = tx.serialize()
  const raw = '0x' + serializedTx.toString('hex');
  return raw;
}
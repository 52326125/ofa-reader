import SparkMD5 from 'spark-md5'

export const arrayBufferMD5 = (arrayBuffer: ArrayBuffer) => {
  const spark = new SparkMD5.ArrayBuffer()
  return spark.append(arrayBuffer).end()
}

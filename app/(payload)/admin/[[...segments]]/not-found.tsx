import { NotFoundPage } from '@payloadcms/next/views'
import configPromise from '../../../../src/payload.config'

const AdminNotFound = () => NotFoundPage({ config: configPromise })

export default AdminNotFound
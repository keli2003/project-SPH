// 起别名引入
import { v4 as uuidv4 } from 'uuid';
// 生成随机字符串 且每次执行不能发生变化 游客持久化存储
export const getUUID = () => {
    // 先看看本地存储有没有uuid
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    if (!uuid_token) {
        // 生成随机字符串
        uuid_token = uuidv4()
        // 如果不存在就存入本地存储
        localStorage.setItem('UUIDTOKEN', uuid_token)
    }
    return uuid_token
}
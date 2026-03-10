import { sessionService } from "../../services/sessionSerivce"
import { useSessionStore } from "../../store/sessionStore"

function ProfilePage() {
    const data = {
        "title": "Тест новой сесии",
        "description": "Тут большое описание, которое я читаю и оно мне нравится",
        "is_private": false
    }
    const { sessions, nextCursor, query } = useSessionStore()
    const handleSession = () => {
        console.log(sessions)
        console.log(nextCursor)  
        console.log(query)
    }

    return (
        <div>
            <h1>Profile page</h1>
            <button onClick={() => sessionService.createSession(data)}>Добавить сессию</button>
            <button onClick={handleSession}>Проверка стора session!</button>
        </div>
    )
}

export default ProfilePage

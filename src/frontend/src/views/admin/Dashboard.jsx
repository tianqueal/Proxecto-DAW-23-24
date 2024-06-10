import { PropTypes } from 'prop-types'
import BarChartSkeleton from '../../components/skeletons/BarChartSkeleton'
import StatCard from '../../components/stats/StatCard'
import TopTopics from '../../components/stats/TopTopics'
import useAdminStats from '../../hooks/admin/useAdminStats'
import './Dashboard.css'
import UserPlus from '../../assets/heroicons/UserPlus'
import ArrowRightEndOnRectangle from '../../assets/heroicons/ArrowRightEndOnRectangle'
import Hashtag from '../../assets/heroicons/Hashtag'
import Users from '../../assets/heroicons/Users'
import CheckBadgeOutline from '../../assets/heroicons/CheckBadgeOutline'
import Signal from '../../assets/heroicons/Signal'
import UserCircleOutline from '../../assets/heroicons/UserCircleOutline'
import Pencil from '../../assets/heroicons/Pencil'
import PencilSquare from '../../assets/heroicons/PencilSquare'

function Header() {
  return (
    <header className="mb-4 flex flex-col items-center justify-between gap-3 md:flex-row">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
        Estadísticas de MasterNote
      </h1>
    </header>
  )
}

function MasonryItem({ title, value, icon: Icon = null }) {
  return (
    <article className="masonry-item" role="listitem">
      <StatCard title={title} value={value} icon={Icon} />
    </article>
  )
}

MasonryItem.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.func,
}

export default function Dashboard() {
  const { stats, isError, isLoading, isValidating } = useAdminStats()

  if (isLoading || isError) {
    return <BarChartSkeleton className="w-auto" />
  }

  if (isError) {
    return (
      <p className="text-xl font-medium text-red-600">Ha ocurrido un error</p>
    )
  }

  if (!isLoading && !isError && !isValidating && !stats) {
    return <p className="text-xl font-medium">¡Sin estadísticas!</p>
  }

  return (
    <>
      <Header />
      <section className="masonry" role="list">
        <MasonryItem
          title="Usuarios conectados"
          value={stats.onlineUsers}
          icon={ArrowRightEndOnRectangle}
        />
        <MasonryItem
          title="Usuarios totales"
          value={stats.users}
          icon={Users}
        />
        <MasonryItem title="Total de notas" value={stats.notes} icon={Pencil} />
        <MasonryItem
          title="Notas publicadas en la comunidad"
          value={stats.communityNotes}
          icon={Signal}
        />
        <MasonryItem title="Temas" value={stats.topics} icon={Hashtag} />
        <MasonryItem
          title="Roles"
          value={stats.roles}
          icon={UserCircleOutline}
        />
        <MasonryItem
          title="Promedio de notas por usuario"
          value={stats.averageNotesPerUser.toFixed(2)}
        />
        <MasonryItem
          title="Promedio de temas por nota"
          value={stats.averageTopicsPerNote.toFixed(2)}
        />
        <MasonryItem
          title="Promedio de roles por usuario"
          value={stats.averageRolesPerUser.toFixed(2)}
        />
        <MasonryItem
          title="Usuarios con múltiples roles"
          value={stats.usersWithMultipleRoles}
        />
        <MasonryItem title="Notas sin temas" value={stats.notesWithoutTopics} />
        <MasonryItem
          title="Usuarios verificados"
          value={stats.verifiedUsers}
          icon={CheckBadgeOutline}
        />
        <MasonryItem
          title="Notas creadas en el último mes"
          value={stats.notesLastMonth}
          icon={PencilSquare}
        />
        <MasonryItem
          title="Nuevos usuarios hoy"
          value={stats.usersToday}
          icon={UserPlus}
        />
        <article className="masonry-item" role="listitem">
          <TopTopics topics={stats.topTopics} />
        </article>
      </section>
    </>
  )
}

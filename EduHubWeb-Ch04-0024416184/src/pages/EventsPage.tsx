import { useState } from 'react'
import { useSearchParams } from 'react-router'
import { ClubFilter } from '../components/ClubFilter'
import { EventList } from '../components/EventList'
import { PageContainer } from '../components/PageContainer'
import { SearchBar } from '../components/SearchBar'
import { clubs, events } from '../data'
import { filterEvents } from '../lib/events'

export function EventsPage() {
  // Challenge ch4-T7: Đồng bộ bộ lọc với URL qua useSearchParams
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get('q') ?? ''
  const clubId = searchParams.get('club') ?? ''
  const includePast = searchParams.get('past') === 'true'
  const [now] = useState(() => new Date())

  function handleQueryChange(newQuery: string) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (newQuery) {
          next.set('q', newQuery)
        } else {
          next.delete('q')
        }
        return next
      },
      { replace: true },
    )
  }

  function handleClubChange(newClubId: string) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (newClubId) {
        next.set('club', newClubId)
      } else {
        next.delete('club')
      }
      return next
    })
  }

  function handleIncludePastChange(checked: boolean) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (checked) {
        next.set('past', 'true')
      } else {
        next.delete('past')
      }
      return next
    })
  }

  // Dữ liệu suy ra: tính lại mỗi lần render từ searchParams — KHÔNG useState, KHÔNG useEffect.
  const visibleEvents = filterEvents(events, { query, clubId, includePast }, now)

  return (
    <PageContainer>
      <h1>Lịch sự kiện</h1>
      <p className="mt-3 mb-8 max-w-[60ch] text-lg text-ink-muted">
        Học kỳ I, năm học 2026–2027. Sự kiện có nhãn <strong>Sắp hết chỗ</strong> chỉ còn dưới 20% số chỗ —
        đăng ký sớm nhé.
      </p>

      <search className="mb-6 grid gap-4 rounded-md border border-line bg-surface p-4 sm:grid-cols-[2fr_1fr]">
        <SearchBar value={query} onChange={handleQueryChange} />
        <ClubFilter clubs={clubs} value={clubId} onChange={handleClubChange} />
        <label className="flex items-center gap-2 sm:col-span-2">
          <input
            type="checkbox"
            checked={includePast}
            onChange={(e) => handleIncludePastChange(e.target.checked)}
            className="size-4.5 accent-primary"
          />
          Hiện cả sự kiện đã diễn ra
        </label>
      </search>

      <p role="status" className="mb-4 text-sm text-ink-muted">
        Tìm thấy {visibleEvents.length} sự kiện
      </p>
      <EventList events={visibleEvents} now={now} />
    </PageContainer>
  )
}

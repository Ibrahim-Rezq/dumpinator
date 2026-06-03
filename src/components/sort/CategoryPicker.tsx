import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from '@/components/ui/drawer'
import type { Category } from '@/types'

interface CategoryPickerProps {
  onSelect: (category: Category) => void
}

const CATEGORIES: Array<{ value: Category; label: string; emoji: string }> = [
  { value: 'work',     label: 'Work',     emoji: '🏥' },
  { value: 'code',     label: 'Code',     emoji: '💻' },
  { value: 'school',   label: 'School',   emoji: '📖' },
  { value: 'personal', label: 'Personal', emoji: '🧭' },
]

export function CategoryPicker({ onSelect }: CategoryPickerProps) {
  return (
    <Drawer open onOpenChange={(open) => { if (!open) onSelect(null) }} direction="bottom">
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-caption-caps text-muted-foreground text-center">
            Category (optional)
          </DrawerTitle>
        </DrawerHeader>

        <div className="px-4 grid grid-cols-2 gap-2.5 pb-2">
          {CATEGORIES.map(({ value, label, emoji }) => (
            <Button
              key={value}
              variant="outline"
              onClick={() => onSelect(value)}
              className="justify-start gap-3 h-14 text-body-medium"
            >
              <span className="text-xl">{emoji}</span>
              {label}
            </Button>
          ))}
        </div>

        <DrawerFooter>
          <Button variant="ghost" onClick={() => onSelect(null)} className="text-muted-foreground">
            Skip
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

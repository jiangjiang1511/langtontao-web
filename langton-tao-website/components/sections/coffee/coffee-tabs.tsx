'use client'

import { coffeeSections } from '@/lib/content/coffee'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

export function CoffeeTabs() {
  return (
    <Tabs defaultValue={coffeeSections[0].id} className="mt-10">
      <TabsList className="h-auto w-full flex-wrap justify-start">
        {coffeeSections.map((section) => (
          <TabsTrigger key={section.id} value={section.id}>
            {section.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {coffeeSections.map((section) => (
        <TabsContent key={section.id} value={section.id}>
          <div
            id={section.id}
            className="scroll-mt-24 rounded-xl border border-zinc-200 bg-white p-6"
          >
            <h2 className="text-xl font-semibold text-zinc-900">
              {section.title}
              {'note' in section && section.note && (
                <span className="ml-2 text-sm font-normal text-zinc-500">
                  （{section.note}）
                </span>
              )}
            </h2>
            {'items' in section && section.items && (
              <ul className="mt-4 space-y-2">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className={
                      'highlight' in section && section.highlight === item
                        ? 'text-base font-semibold text-zinc-900'
                        : 'text-sm text-zinc-700'
                    }
                  >
                    · {item}
                  </li>
                ))}
              </ul>
            )}
            {'insurers' in section && section.insurers && (
              <div className="mt-6">
                <p className="text-sm font-medium text-zinc-800">保险公司</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {section.insurers.map((name) => (
                    <span
                      key={name}
                      className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {'placeholder' in section && (
              <p className="mt-4 text-sm text-zinc-500">{section.placeholder}</p>
            )}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}

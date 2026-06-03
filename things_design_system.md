# Things-Inspired Task Manager Design System Specification
Version: 1.0.0  
Status: Approved  
Author: Design Systems Team  

---

## 1. Executive Summary & Design Philosophy

This design system codifies the visual and interaction paradigms inspired by Cultured Code's **Things**. The system prioritizes content over container, intentional whitespace, stark typographic hierarchy, and tactile, physics-based micro-interactions. By removing heavy visual dividers and relying entirely on typography, spacing, and subtle elevation changes, the interface creates a calm, focused digital workspace mimicking premium Japanese stationery in Light Mode and a high-end leather ledger in Dark Mode.

### Core Pillars
1. **Uncompromising Minimalism**: Elements only exist if they serve an immediate utilitarian or spatial purpose. No extraneous borders, lines, or shadows.
2. **Intentional Whitespace**: Generous spacing is treated as an active layout tool to reduce cognitive load and isolate user focus.
3. **Typography as Structure**: Hierarchy is enforced via dramatic size and weight shifts rather than structural containers.
4. **Tactile Interaction**: Digital components react with predictable, dampened physical animations, making actions like checking off a task feel satisfying and definitive.

---

## 2. Design Tokens

Design tokens are the foundational, single-purpose variables that power the design system across all platforms (Web, iOS, macOS, Android).

### 2.1 Color Palette
The color system utilizes highly optimized neutral tones. Pure blacks are avoided in dark mode to preserve legibility, and pure whites are reserved only for structural sheets in light mode.

#### Light Mode Tokens
| Token Name | Hex Value | RGB Value | Purpose |
| :--- | :--- | :--- | :--- |
| `color-light-bg-app` | `#F4F5F6` | `rgb(244, 245, 246)` | App frame and background layout canvas |
| `color-light-bg-card` | `#FFFFFF` | `rgb(255, 255, 255)` | Active canvas, focused sheets, task blocks |
| `color-light-text-primary` | `#1C1C1E` | `rgb(28, 28, 30)` | Headers, title text, active states |
| `color-light-text-secondary`| `#48484A` | `rgb(72, 72, 74)` | Subheadings, descriptive text, body copy |
| `color-light-text-muted` | `#8E8E93` | `rgb(142, 142, 147)` | Meta tags, placeholders, dates, idle checkbox |
| `color-light-border` | `#E5E5EA` | `rgb(229, 229, 234)` | Used sparsely for structural separators |

#### Dark Mode Tokens
| Token Name | Hex Value | RGB Value | Purpose |
| :--- | :--- | :--- | :--- |
| `color-dark-bg-app` | `#1A1A1A` | `rgb(26, 26, 26)` | Deep system backdrop |
| `color-dark-bg-card` | `#242424` | `rgb(36, 36, 36)` | Main sheets, windows, and interactive containers |
| `color-dark-text-primary` | `#F5F5F7` | `rgb(245, 245, 247)` | Primary reading text, bold titles |
| `color-dark-text-secondary`| `#D1D1D6` | `rgb(209, 209, 214)` | Secondary data points, descriptions |
| `color-dark-text-muted` | `#8E8E93` | `rgb(142, 142, 147)` | Sub-text, dates, unselected elements |
| `color-dark-border` | `#323232` | `rgb(50, 50, 50)` | Subtle contextual grouping lines |

#### Interactive & Accent Tokens
| Token Name | Hex Value | RGB Value | Purpose |
| :--- | :--- | :--- | :--- |
| `color-accent-blue` | `#007AFF` | `rgb(0, 122, 255)` | Primary brand color, active checkboxes, focus rings |
| `color-accent-blue-tint` | `#E3F2FF` | `rgb(227, 242, 255)` | Light mode selection backgrounds (10% opacity) |
| `color-accent-graphite` | `#7D7D82` | `rgb(125, 125, 130)` | System fallback modifier for non-critical selections |

### 2.2 Typography
The typography layer targets system-native sans-serif fonts to match the operating environment (`-apple-system`, `BlinkMacSystemFont`, `San Francisco`, `Inter`, `Geist`).

| Token Name | Font Size | Line Height | Font Weight | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- |
| `font-display-lg` | `28px` | `34px` | `700` (Bold) | `-0.5px` |
| `font-display-md` | `22px` | `28px` | `700` (Bold) | `-0.3px` |
| `font-heading` | `17px` | `22px` | `600` (SemiBold) | `-0.1px` |
| `font-body` | `14px` | `20px` | `400` (Regular) | `0px` |
| `font-body-medium` | `14px` | `20px` | `500` (Medium) | `0px` |
| `font-caption` | `11px` | `14px` | `400` (Regular) | `+0.2px` |
| `font-caption-caps`| `11px` | `14px` | `600` (SemiBold) | `+0.5px` (Uppercase)|

### 2.3 Spacing & Scale
The spacing scale is built entirely on an `8px` geometric grid, with the insertion of a `12px` half-step for compact item layouts.

```
space-xs:   4px
space-sm:   8px
space-md:   12px
space-lg:   16px
space-xl:   24px
space-2xl:  32px
space-3xl:  48px
space-4xl:  64px
```

### 2.4 Elevation & Border Radii
* **Border Radii**: All rounded elements (cards, containers, tags) adhere to uniform curve settings.
  * `radius-sm`: `4px` (Tags, small check targets)
  * `radius-md`: `8px` (Task items, context menus)
  * `radius-lg`: `12px` (Desktop task expanded rows, focus panels)
  * `radius-xl`: `16px` (Mobile bottom sheets, popovers)
* **Shadows**: Shadows are applied sparingly to emulate structural paper layers.
  * `shadow-focus`: `0 10px 30px rgba(0, 0, 0, 0.06)` (Light Mode focus sheet)
  * `shadow-popover`: `0 4px 12px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.02)`

---

## 3. Core Component Specifications

### 3.1 The Iconic Checkbox
The checkbox is the central anchor of the system's interactive satisfaction layer. It is built as a custom circular element.

#### Specifications:
* **Dimensions**: Height: `18px`, Width: `18px`, Border Thickness: `1.5px`
* **Idle State**: Circular ring, color: `color-text-muted`. Center is transparent.
* **Hover State**: Circular ring shifts to `color-accent-blue`. Inner fill receives a subtle tint transition at 5% opacity.
* **Checked State**: Solid fill of `color-accent-blue`. A crisp white checkmark scales up from center (scale `0` to `1`).
* **Micro-Interaction Flow**:
  1. User triggers click.
  2. Checkbox fills instantly (`30ms`).
  3. Parent task row title text transitions to `color-text-muted` and triggers a horizontal strike-through overlay.
  4. The complete task remains visible for an adjustable latency period (`400ms`) before collapsing smoothly (`height: 0`, `opacity: 0`).

```
  Idle         Hover        Checked
  [   ]       [   ]         [ X ]
(Muted Gray) (Accent Blue)  (Filled Blue)
```

### 3.2 The Seamless Task Row (Inline Editing)
Tasks avoid complex modals. Clicking a task transforms the row directly inline into an editable notebook-like sheet.

#### 1. Default Unified Row State
* Vertical Padding: `space-md` (`12px`)
* Horizontal Layout: Left-aligned checkbox, middle text title (`font-body`), right-aligned meta flags (tags, dates).
* No bottom border. Group separation is managed entirely through vertical alignment spacing.

#### 2. Expanded Focused State
Upon user selection, the row transforms smoothly via an in-place morphing sequence.
* Container morphs into `color-bg-card` with an elevation shadow of `shadow-focus`.
* Top margin expands to separate the row from neighboring tasks.
* **Input Fields Reveal**:
  * Title field scales up to `font-heading`.
  * A secondary multiline text input reveals beneath the title for notes (`font-body`, color: `color-text-secondary`).
* **Utility Toolbar Anchor**:
  * Slides up from the bottom boundary of the row card. Contains tag pill injectors, date selectors, calendar scheduling nodes, and subtask checklists.

```
+-------------------------------------------------------------+
| [ ] Review project roadmap                       Tomorrow   |
+-------------------------------------------------------------+
  ↓ (Transitions on Selection Click)
+-------------------------------------------------------------+
|                                                             |
|  [ ]  Review project roadmap                                |
|       Add granular milestones or structural steps here...   |
|                                                             |
|  +-------------------------------------------------------+  |
|  | [Tag: Engineering]  [Calendar: Oct 24]  [Subtasks 2/4]|  |
|  +-------------------------------------------------------+  |
+-------------------------------------------------------------+
```

### 3.3 The Floating Magic "+" Action Button
On mobile layouts, the primary creation vehicle is a fixed circular interactive target positioned in the bottom-right sector.

#### Specifications:
* **Default State**: Circle diamater: `56px`, Background: `color-accent-blue`, Foreground Icon: `White Plus (+)`, Elevation: `shadow-popover`.
* **Dynamic Physics (Drag Insertion)**:
  * The user can either tap the button to inject a task globally at the root stack, OR drag the button off its fixed axis.
  * When dragged, the button scales down into a mini inline task cursor placeholder (`24px`).
  * As the user moves the cursor between existing list items, the task list dynamically splits open, inserting `space-xl` gaps to visualize exactly where the new record will be dropped.

### 3.4 Project Progress Ring
Projects are tracked visually using compact SVG stroke-dasharray indicator graphics nested inside sidebar menus or top-level canvas headers.

#### Specifications:
* **Geometry**: Track size `16px` diameter, stroke thickness `2px`.
* **Track Color**: `color-border`
* **Progress Color**: `color-accent-blue`
* **Calculation Rule**:
  $$\text{Stroke Dash Offset} = \text{Circumference} \times \left(1 - \frac{\text{Completed Tasks}}{\text{Total Tasks}}\right)$$
* When completion reaches 100%, the ring transforms via crossfade into a complete solid check-icon vector.

---

## 4. Navigation & Layout Structures

### 4.1 Global Desktop Window Layout
The desktop surface avoids complex frame splits. It uses a clean dual-column presentation model.

```
+------------------+-----------------------------------------------+
|  Inbox       [2] |  Today                                        |
|  Today       [4] |  ===========================================  |
|  Upcoming        |                                               |
|  Anytime         |  [ ] Design system documentation              |
|  Someday         |  [ ] Finalize high-fidelity components        |
|                  |                                               |
|  PROJECTS        |  Upcoming Milestones                          |
|  ■ App Redesign  |  -------------------------------------------  |
|  ■ Web Portal    |  [ ] Review layout system options             |
|                  |                                               |
+------------------+-----------------------------------------------+
```

* **The Left Sidebar Layout**:
  * Width: Fixed `240px` to `280px`.
  * Background Color: Syncs with `color-bg-app`.
  * Padding Elements: Left-aligned text items, single-column vertical track. No separator dividers. Vertical line heights set explicitly to `36px` per structural item.
* **The Main Content Canvas**:
  * Width: Fluid stretching with explicit boundaries (`max-width: 720px`).
  * Centered directly on screen, bordered by wide margin lanes (`px-4xl` to `px-6xl`).
  * Margins allow multi-task lists to appear organized like a standard single column sheet layout.

---

## 5. Animation, Interaction, & Motion Rules

Motion inside this system acts as the core feedback mechanism. All transitions must avoid linear rates and heavy spring oscillations, favoring highly dampened organic eases.

### 5.1 Easing Curves & Structural Timings
* **Primary System Ease**: `cubic-bezier(0.2, 0.8, 0.2, 1)` (Fast departure, long slow deceleration stabilization curve).
* **Linear-Ease Transition**: `cubic-bezier(0.25, 0.1, 0.25, 1)` (Only reserved for opacity crossfading variables).

| Interaction Event | Structural Transition | Duration Rate | Target Curve Type |
| :--- | :--- | :--- | :--- |
| **Row Selection Expansion**| Layout height morph & pad adjustment | `280ms` | Primary System Ease |
| **Checkbox Active Click** | Radial vector color fill & stamp scale | `40ms` fill / `120ms` scale | Linear / Pop Scale |
| **Task Completion Collapse**| Max-height reduction to zero pixels | `320ms` | Primary System Ease |
| **Sidebar Navigation Flip** | View layer crossfade slide | `200ms` | Primary System Ease |
| **Popover Overlay Reveal** | Vertical translate up (`12px` to `0px`) | `180ms` | Deceleration Curve |

### 5.2 Micro-State Interaction Properties
To reflect realistic physical feedback loops, items respond to user hover locations:
* **Task Item Hover**: The canvas background properties layer remains uniform, but contextual functional edit targets (such as drag handle indicators or context grab targets) fade from an opacity scale of `0` to `1` over a `120ms` timing window.
* **Drag-and-Drop Reordering Engine**:
  * When picking up a task item row, scale the structural card boundary up to `1.02x` original dimensions and raise the layout shadow to `shadow-focus`.
  * Adjacent static tasks run transition translations shifting away from the dragging item footprint along the Y-axis.

---

## 6. Code Framework Implementations

### 6.1 Tailwind CSS Integration Token Config
Engineers can inject the design token ecosystem directly into a standard JavaScript Tailwind configuration architecture.

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        things: {
          light: {
            bgApp: '#F4F5F6',
            bgCard: '#FFFFFF',
            textPrimary: '#1C1C1E',
            textSecondary: '#48484A',
            textMuted: '#8E8E93',
            border: '#E5E5EA',
          },
          dark: {
            bgApp: '#1A1A1A',
            bgCard: '#242424',
            textPrimary: '#F5F5F7',
            textSecondary: '#D1D1D6',
            textMuted: '#8E8E93',
            border: '#323232',
          },
          accent: {
            blue: '#007AFF',
            blueTint: 'rgba(0, 122, 255, 0.10)',
            graphite: '#7D7D82',
          }
        }
      },
      fontFamily: {
        sans: [
          '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 
          'Roboto', 'Helvetica', 'Arial', 'sans-serif'
        ],
      },
      transitionTimingFunction: {
        'things-fluid': 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      },
      boxShadow: {
        'things-focus': '0 10px 30px rgba(0, 0, 0, 0.06)',
        'things-popover': '0 4px 12px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.02)',
      }
    },
  },
  plugins: [],
}
```

---

## 7. Accessibility & Engineering Quality Standards

Despite the intentional low-contrast minimalist identity options, the system implements standard fallback mechanisms to remain completely readable and functional under global universal standards.

1. **A11y Text Enhancements**:
   * For standard reading passes, body layouts scale up color variables dynamically to preserve structural strict contrast levels of at least **4.5:1** matching WCAG AA specifications.
   * If `color-light-text-secondary` is paired with white card backgrounds, verification passes validate a contrast metric above minimum targets.
2. **Keyboard Traversal Engine**:
   * System elements map navigation paths cleanly via keyboard traps. Focus states default to generating explicit high-visibility blue external ring indicators (`color-accent-blue`) matching `outline: 2px solid`.
   * Action Keys: `CMD + N` (New task inline injector), `Enter` (Saves active editing row changes), `Escape` (Closes focus cards instantly).
3. **Screen Reader Content Structuring**:
   * Checkbox items must use native HTML inputs `<input type="checkbox">` styled out or configured with comprehensive hidden label attributes (`aria-label="Mark task complete"`).
   * Status updates (e.g., automated layout re-ordering sequences or completed clear sequences) update screen reader nodes dynamically using discrete live announcement flags (`aria-live="polite"`).

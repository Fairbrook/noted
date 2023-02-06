# Noted

__Autor__: Kevin Alan Martinez 219294382


Aplicación para hacer notas rápidas en tus classes en markdown, basada en React, Electron y Typescript

__Lo mejor: no hay botnes de guardar, todo se guarda de forma automática!!__

## Capturas de pantalla

### Pantalla de inicio
![](https://i.ibb.co/fk4dmRp/Screen-Shot-2023-02-06-at-12-08-26.png)

### Agregar una clase
![](https://i.ibb.co/t2nx3Kc/Screen-Shot-2023-02-06-at-12-08-36.png)
![](https://i.ibb.co/r7G6d1d/Screen-Shot-2023-02-06-at-12-08-39.png)

### Agrega una nota
![](https://i.ibb.co/wgD0nqc/Screen-Shot-2023-02-06-at-12-09-43.png)
![](https://i.ibb.co/tKJkv5X/Screen-Shot-2023-02-06-at-12-09-50.png)

Al actualizar la nota, se hará un debounce de 500ms para guardar el archivo correspondiente a la nota.
Las notas se guardan en tu carpeta de usuario, por ejemplo `~/noted` para sistemas basados en Unix

#### El código que realiza esta función de autogardado
```js
function Editor(): JSX.Element {
  const { noteId } = useParams()
  const { updateContent, note, updateName, deleteNote } = useNote(noteId)
  const editorRef = useRef<EditorJS | null>()
  const timeoutRef = useRef<NodeJS.Timeout>()

  const onSave = useCallback((): void => {
    if (typeof timeoutRef.current !== 'undefined') {
      clearTimeout(timeoutRef.current)
    }
    if (!editorRef.current) return
    const markdown = editorRef.current?.getInstance().getMarkdown()
    if (typeof markdown !== 'string') return
    timeoutRef.current = setTimeout(() => {
      updateContent(markdown)
    }, 500)
  }, [])

  if (!note) return <Navigate to="/" />

  return (
    <div>
      <EditableTopBar
        value={note.name}
        onChange={({ target }): void => {
          updateName(target.value)
        }}
        onDelete={deleteNote}
      />
      <EditorJS
        ref={(r): void => {
          editorRef.current = r
        }}
        theme="dark"
        height="80vh"
        initialValue={note.content}
        onChange={onSave}
        placeholder="Que esperas, a escribir..."
      />
    </div>
  )
}
```

## Como instalar

Si tiene uno de los sistemas soportados (Linux, Widnows, Mac) puede usar uno de los
binarios disponibles en [release](https://github.com/Fairbrook/noted/releases)

## Project Setup

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```


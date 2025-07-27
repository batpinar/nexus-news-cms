import React from 'react'

interface LexicalNode {
  type: string
  children?: LexicalNode[]
  text?: string
  format?: number | string
  style?: string
  direction?: string
  indent?: number
  version?: number
  detail?: number
  mode?: string
  [key: string]: any // Payload CMS'ten gelen diğer özellikler için
}

interface LexicalContent {
  root: LexicalNode
  [key: string]: any // Payload CMS'ten gelen diğer özellikler için
}

interface RichTextRendererProps {
  content: LexicalContent | null | any
}

function renderLexicalNode(node: LexicalNode, key: number = 0): React.ReactNode {
  if (!node) return null

  // Text node
  if (node.type === 'text' && node.text) {
    let textElement: React.ReactNode = node.text
    
    // Format uygulamaları (bold, italic, etc.)
    if (typeof node.format === 'number' && node.format > 0) {
      if (node.format & 1) { // Bold
        textElement = <strong key={key}>{textElement}</strong>
      }
      if (node.format & 2) { // Italic
        textElement = <em key={key}>{textElement}</em>
      }
      if (node.format & 4) { // Strikethrough
        textElement = <del key={key}>{textElement}</del>
      }
      if (node.format & 8) { // Underline
        textElement = <u key={key}>{textElement}</u>
      }
    }
    
    return textElement
  }

  // Paragraph node
  if (node.type === 'paragraph') {
    return (
      <p key={key}>
        {node.children?.map((child, index) => renderLexicalNode(child, index))}
      </p>
    )
  }

  // Heading nodes
  if (node.type === 'heading') {
    const tag = node.indent || 1
    const headingLevel = Math.min(Math.max(tag, 1), 6)
    
    switch (headingLevel) {
      case 1:
        return <h1 key={key}>{node.children?.map((child, index) => renderLexicalNode(child, index))}</h1>
      case 2:
        return <h2 key={key}>{node.children?.map((child, index) => renderLexicalNode(child, index))}</h2>
      case 3:
        return <h3 key={key}>{node.children?.map((child, index) => renderLexicalNode(child, index))}</h3>
      case 4:
        return <h4 key={key}>{node.children?.map((child, index) => renderLexicalNode(child, index))}</h4>
      case 5:
        return <h5 key={key}>{node.children?.map((child, index) => renderLexicalNode(child, index))}</h5>
      default:
        return <h6 key={key}>{node.children?.map((child, index) => renderLexicalNode(child, index))}</h6>
    }
  }

  // List nodes
  if (node.type === 'list') {
    const ListTag = node.style === 'ordered' ? 'ol' : 'ul'
    return (
      <ListTag key={key}>
        {node.children?.map((child, index) => renderLexicalNode(child, index))}
      </ListTag>
    )
  }

  if (node.type === 'listitem') {
    return (
      <li key={key}>
        {node.children?.map((child, index) => renderLexicalNode(child, index))}
      </li>
    )
  }

  // Quote node
  if (node.type === 'quote') {
    return (
      <blockquote key={key}>
        {node.children?.map((child, index) => renderLexicalNode(child, index))}
      </blockquote>
    )
  }

  // Code block
  if (node.type === 'code') {
    return (
      <pre key={key}>
        <code>
          {node.children?.map((child, index) => renderLexicalNode(child, index))}
        </code>
      </pre>
    )
  }

  // Line break
  if (node.type === 'linebreak') {
    return <br key={key} />
  }

  // Root node - render children
  if (node.type === 'root') {
    return (
      <div key={key}>
        {node.children?.map((child, index) => renderLexicalNode(child, index))}
      </div>
    )
  }

  // Default - render children if they exist
  if (node.children) {
    return (
      <div key={key}>
        {node.children.map((child, index) => renderLexicalNode(child, index))}
      </div>
    )
  }

  return null
}

export function RichTextRenderer({ content }: RichTextRendererProps) {
  if (!content || !content.root) {
    return <div className="rich-text-content">İçerik bulunamadı.</div>
  }

  return (
    <div className="rich-text-content">
      {renderLexicalNode(content.root)}
    </div>
  )
}

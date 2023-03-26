import { Card } from '@mui/material'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const Response = ({ botResponse, promptQuestion, totalTokens }) => {
  return (
    <Card sx={{ p: 1 }}>
      <div className="container space">
        <h3>You: {promptQuestion}</h3>
        <h4 title="Total token cost">{totalTokens}</h4>
      </div>
      <div className="underline-full mg-top-sm mg-bot-sm"></div>

      <ReactMarkdown
        children={botResponse}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={coldarkDark}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
        }}
      />
    </Card>
  )
}

export default Response

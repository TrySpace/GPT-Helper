import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { Card, Divider, Stack, Typography } from '@mui/material'

export interface ChatResponse {
  botResponse: string
  promptQuestion: string
  totalTokens?: string
}

export const ChatResponse: React.FC<ChatResponse> = ({
  botResponse,
  promptQuestion,
  totalTokens,
}) => {
  return (
    <Card sx={{ p: 1 }}>
      <Stack direction="row" flexWrap="wrap" justifyContent="space-between">
        <Typography variant="body1">You: {promptQuestion}</Typography>
        <Typography variant="caption" title="Total token cost">
          {totalTokens}
        </Typography>
      </Stack>
      <Divider sx={{ py: 1 }} />

      <ReactMarkdown
        children={botResponse}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                style={atomDark}
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

// export default ChatResponse

import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark, prism } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { Card, Divider, Skeleton, Stack, Typography } from '@mui/material'
import useAppStore from '../store/appstore'
import Box from '@mui/material/Box'

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
  const { theme } = useAppStore()
  return (
    <Card sx={{ px: 2, pt: 2, pb: 1 }}>
      <Stack direction="row" flexWrap="wrap" justifyContent="space-between">
        <Typography variant="body1">You: {promptQuestion}</Typography>
        <Typography variant="caption" title="Total token cost">
          {totalTokens}
        </Typography>
      </Stack>
      <Divider sx={{ mt: 1 }} />

      <ReactMarkdown
        children={botResponse}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                style={theme === 'dark' ? atomDark : prism}
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
export const ChatResponseLoading: React.FC<{ promptQuestion: string }> = ({
  promptQuestion,
}) => {
  return (
    <Card sx={{ px: 2, pt: 2, pb: 1 }}>
      <Stack
        direction="column"
        flexWrap="wrap"
        justifyContent="space-between"
        sx={{ width: '100%' }}
      >
        <Typography variant="body1">You: {promptQuestion}</Typography>
        <Divider sx={{ mt: 1 }} />
        <Typography component="div" variant="body1">
          <Skeleton sx={{ height: '80px' }} />
        </Typography>
      </Stack>
    </Card>
  )
}

// export default ChatResponse

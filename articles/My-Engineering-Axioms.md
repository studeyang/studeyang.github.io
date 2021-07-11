<h1><center>My Engineering Axioms</center></h1>

> author: yanglulu<br/>date: 2021-06-22 14:17:00
---

A few months back I gave a talk in which I shared a list of my personal engineering axioms – things that, over the years, I've come to think of as generally true and useful to have in mind when writing code, building things, and working with others.

⼏个⽉前，我在⼀次演讲中分享了我的个⼈⼯程学原理清单——这些事情，多年来，我开始认为在编写代码、构建 东⻄以及与他⼈⼀起⼯作时，这些原理是普遍真实和有⽤的。

Axiom is a fancy word, but popping a few layers off the etymology stack we arrive neatly at the ancient Greek word ἀξίωμα, or "that which is thought fit or worthy". I like that, and consider each item on the list at least worthy of consideration. 

公理是⼀个花哨的词，但是从词源堆栈中剥离出⼏层，我们整⻬地得到了古希腊词 something ξ something ωμα， 或者“被认为合适或有价值的东⻄”。我喜欢这样，认为清单上的每⼀项⾄少都值得考虑。

Of course they're my engineering axioms – things I believe to be useful based on my own experience. Your experience may well differ. Maybe you already knew about zero termination, or have better tools than scissors to remove bugs from your programs. 

当然，它们是我的⼯程学公理——根据我⾃⼰的经验，我认为这些公理很有⽤。你的经历可能会有所不同。也许你 已经知道零终⽌，或者有⽐剪⼑更好的⼯具来删除程序中的 bug。 

In any case, I thought it would be fun to share the list here, with a few brief clarifications. Some things are pretty unsurprising, but hopefully others will generate some provocative thoughts and/or interesting disagreements. 

⽆论如何，我认为在这⾥分享这个列表会很有趣，只是做了⼀些简短的澄清。有些事情并不令⼈惊讶，但是希望其 他事情会引起⼀些挑衅性的想法和/或有趣的分歧。 

## 1. Change is constant. 变化是恒定的

This one shouldn't be too controversial. Almost everything is always changing, including the rate of change itself. We need to acknowledge not only that our ability to respond to change is crucial, but that how well we do it (time, cost, quality, reliability) is often a dimension of our competitiveness.

这个问题不应该引起太⼤争议。⼏乎⼀切都在变化，包括变化的速度本身。我们不仅需要认识到我们应对变化的能 ⼒是⾄关重要的，⽽且我们做得如何(时间、成本、质量、可靠性)往往是我们竞争⼒的⼀个⽅⾯。 

## 2. Your product is an asset, but code is a liability. 你的产品是⼀种资产，但代码是⼀种负担 

Your product solves your customer's problem(s), and therefore is your asset. The code itself is the cost of creating the asset. The more code you have, the more it needs to be read, tested, changed, and understood. This is especially relevant when you consider axiom 1. Accept new code (and dependency on external code) conservatively. The best code is code you don't have to write.

你的产品解决了客户的问题，因此是你的资产。代码本身就是创建资产的成本。你拥有的代码越多，需要阅读、测 试、更改和理解的代码就越多。当你考虑公理1时，这⼀点尤其重要。保守地接受新代码(以及对外部代码的依赖)。 最好的代码就是你不必写的代码。 

## 3. Duplication is less costly than premature abstraction. 重复⽐过早的抽象成本低 

Until you have a high degree of confidence that your abstraction is going to pay for itself because it solves a real, abstract problem you really do have, don't do it. Wait and learn more. Until then, repeating code can help avoid dependency, which itself makes the code easier to change independently or delete. A premature abstraction creates complexity through dependency and indirection, and can become a bottleneck to your ability to respond to change.

除⾮你有⾜够的信⼼，相信你的抽象将会为它⾃⼰付出代价，因为它解决了你真正拥有的⼀个真实的、抽象的问 题，否则不要这样做。等待并学习更多。在此之前，重复代码可以帮助避免依赖性，这本身使代码更容易独⽴更改 或删除。过早的抽象通过依赖性和间接性创建复杂性，并可能成为响应变化能⼒的瓶颈。 

## 4. Code should be easy to delete. 代码应该易于删除 

Write code to be removable, which in large part is the same as saying "decoupled". For sure not all code needs to be similarly removable, but minimising dependencies, having clear boundaries via well-defined interfaces, and having a thoughtful overall system design allows parts to be removed/changed more easily. I once heard someone use the expression "code spent", as an alternative to "code written" and I love that. I like the implication that removing code is reducing future cost. 

编写可移动的代码，这在很⼤程度上等同于说“解耦”。当然，并不是所有的代码都需要类似的可移动性，但是最⼤ 限度地减少依赖性，通过定义良好的接⼝拥有清晰的界限，以及有⼀个周到的整体系统设计，可以让部件更容易地 被移除/更改。我曾经听说有⼈使⽤“代码花费”这个短语来替代“代码编写”，我很喜欢这个说法。我喜欢删除代码可 以减少未来成本的含义。

## 5. Existing code exerts a powerful influence. 现有的代码会产⽣强⼤的影响 

The very fact it's there suggests it's correct and necessary. Hopefully it is, but not always. We need to maintain both the confidence to change it, and the ability to reason about whether we should. Don't let the existence of code itself create doubt that it can't be removed. As per axiom 4, it should be easy to remove, and the system design should be good enough to enable us to understand whether we still need it. 

它存在的事实表明它是正确的和必要的。希望如此，但并不总是如此。我们既需要保持改变它的信⼼，也需要保持 思考是否应该改变的能⼒。不要让代码本身的存在产⽣⽆法删除的怀疑。根据公理4，它应该很容易删除，系统设 计应该⾜够好，使我们能够理解我们是否仍然需要它。

## 6. Accidental complexity is one of the biggest risks. 偶然复杂度是最⼤的⻛险之⼀ 

Accidental complexity is complexity that can be avoided, and occurs due to things like poor design, bad decisions, and not prioritising an appropriate level of simplicity within a system. If simplicity is not a goal, accidental complexity is more likely to occur as a system grows, and will gradually negatively affect almost everything from changing the system to even being able to understand it. The 2006 paper Out of the Tar Pit is a worthwhile read on this subject. 

偶然复杂度是⼀种可以避免的复杂性，这种复杂性的产⽣是由于诸如糟糕的设计、糟糕的决策以及系统中没有优先 考虑适当程度的简单性之类的事情。如果简单性不是⽬标，那么随着系统的发展，偶然复杂度就更有可能出现，并 且会逐渐对⼏乎所有事情产⽣负⾯影响，从改变系统到甚⾄能够理解它。2006年的论⽂《⾛出焦油坑》是⼀篇关于 这个主题的值得阅读的⽂章。 

## 7. Technical excellence can be shadowed by bad personal skills. 糟糕的个⼈⼯作技巧可以掩盖技术上的优秀 

Unless you're working completely alone, it's not just your ability to solve technical problems, to write good code, etc, that matters. To the contrary, they matter even less if you make the people around you unhappy and less productive. Just like learning to write good code, you have to learn "to people" good as well. Empathy is a big part of this, as is recognising that people are different – be caring, be understanding, help others and ask for help yourself, be nice. Be an engineer others want to work with.

除⾮你是完全独⽴⼯作的，否则重要的不仅仅是你解决技术问题的能⼒，编写好代码的能⼒等等。相反，如果你让 周围的⼈不开⼼，⼯作效率降低，那么它们就更不重要了。就像学习编写好的代码⼀样，你也必须学会“对⼈”好。 同理⼼是其中很重要的⼀部分，因为我们认识到⼈们是不同的——关⼼他⼈，理解他⼈，帮助他⼈，请求帮助⾃ ⼰，友好⼀点。做⼀个别⼈愿意合作的⼯程师。 

## 8. You are not your code. Be kind to the coder, not to the code. 你不是你的代码。善待编码者，⽽不是代码 

Code is merely a moment in time that captured what we thought we knew about something. It's not you. You may have wrote it, but since that moment (even if it was 3 minutes ago) you've grown, but the code has not. A conversation about code, good or bad, should never be personal. Keep it professional. Talk about the code, or about the problem, but don't make it about the person who wrote it. Use "we" instead of "you". Sometimes I try to pretend I wrote the code someone else wrote, which helps me avoid accidentally sounding personal. 

代码只不过是⼀个时间⽚段，它捕捉到了我们以为⾃⼰知道的某些事情。不是你的问题。您可能已经编写了它，但 是⾃从那⼀刻(即使是3分钟前)以来，您已经成⻓了，但是代码却没有。关于代码的对话，⽆论好坏，都不应该是私 ⼈的。保持专业。谈论代码，或者问题，但是不要把话题扯到写代码的⼈身上。⽤“我们”代替“你”。有时候我会假 装⾃⼰写的代码是别⼈写的，这样可以避免不⼩⼼听起来像是私⼈问题。

## 9. Treat people who know less than you with respect and patience. 尊重和耐⼼对待那些知道的⽐你少的⼈ 

We all start somewhere, and the journey is a lot more joyful when you're surrounded by patient people who want you to succeed, rather than those who make you feel like you don't belong. If you struggle with this, it may be helpful to remember that the newbie programmer almost certainly does something better than you do – perhaps they're fluent in another language, or cook amazingly, or play a sport. Just imagine yourself in the reverse role. How would you like them to treat you, the total newbie? Again: be an engineer others want to work with. 

我们都会从某个地⽅开始，当你周围都是那些有耐⼼且希望你成功的⼈，⽽不是那些让你觉得⾃⼰不属于这⾥的⼈时， 这个旅程会更加快乐。如果你纠结于此，记住新⼿程序员肯定会有⽐你做得更好的地方——也许他们能流利地说另⼀⻔语⾔，或者厨艺很棒，或者擅长某项运动。想象⼀下你⾃⼰处于相反的⻆⾊。你希望他们如何对待你这个新⼿？再次强调: 做⼀个别⼈愿意合作的⼯程师。 

## 10. The only true authority stems from knowledge, not from position. 唯⼀真正的权威来⾃知识，⽽不是地位 

Knowledge and understanding of the problem, the domain, the customer, are all far more important than whatever the first 3 letters on your business card are. Even if it does have a watermark. Understand how something works from first principles, build a solid understanding, and authority will follow. 

对问题的了解和理解---- 领域、客户---- 都⽐你名⽚上的前三个字⺟重要得多。即使上⾯有⽔印。从最基本的原则理 解事物是如何⼯作的，建⽴⼀个坚实的理解，然后权威就会随之⽽来。 

## 11. Teaching is a form of learning in disguise. 教学是另⼀种学习形式 

If you think you know something, try teaching it. Often the very act of trying to explain what you know to someone else forces you to formalise your own thoughts much more clearly. Writing things down seems to have a similar effect. I've lost count of the number of times I've begun explaining something only to find I don't quite understand it as well as I thought. 

如果你认为你知道⼀些东⻄，试着教它。通常，向别⼈解释你所知道的事情会迫使你把⾃⼰的想法变得更加清晰。 把事情写下来似乎也有类似的效果。我已经数不清有多少次，我开始解释某件事，却发现⾃⼰并不像⾃⼰想象的那 样理解它。 

## 12. Lift the skills of people around you, not just yourself. 提升身边⼈的技能，⽽不仅仅是你⾃⼰ 

A great team is never a great because of one amazing person. It's a great team because everyone challenges each other and everybody grows together. When you learn something cool, share it – help the people around you get better. As they do the same, everybody benefits and nobody gets left behind. It's also far more fun. Secondary benefit: axiom 11. 

伟⼤的团队永远不会因为⼀个了不起的⼈⽽成为伟⼤的团队。这是⼀个伟⼤的团队，因为每个⼈都互相挑战，共同 成⻓。当你学到⼀些很酷的东⻄时，分享它——帮助你周围的⼈变得更好。当他们做同样的事情时，每个⼈都会受 益，没有⼈会被落下。这也更有趣。次级福利: 公理11。

## 13. The longer you wait the more you'll know. 你等的时间越⻓，你知道的就越多 

I'm still learning this and trying hard to avoid my almost default desire to decide quickly. The truth is, the longer you delay non-essential decisions the more information you'll have to lean on when the time comes to make it. Of course you can't always procrastinate a decision, but often you can, and as a minimum you should at least consider whether not knowing the answer right now is actually OK. 

我仍在学习这⼀点，并努⼒避免我⼏乎默认的快速决定的欲望。事实上，你越是拖延那些不重要的决定，你就会在 做决定的时候依赖更多的信息。当然，你不能总是拖延⼀个决定，但通常你可以，⾄少你应该考虑现在不知道答案 是否可⾏。 

## 14. A good type system is worth its weight plus some. ⼀个好的类型系统是值得它的重量加上⼀些的 

Having gone backwards and forwards through various static and dynamic languages over my career, I'm currently of the opinion that a good type system is worth its overhead. A good type system shouldn't carry all that much overhead. If the type system is designed well, it can almost feel like a dynamic language (via features like inference and flow analysis) while removing a whole class of issues that the compiler can handle far better and quicker than you can. Developments like ownership in Rust are a nice example of how this has gone even further than people would have imagined years back. 

在我的职业⽣涯中，我在各种静态和动态语⾔中来来回回地学习，现在我认为⼀个好的类型系统值得它的开销。⼀ 个好的类型系统不应该承担那么多的开销。如果类型系统设计得很好，它⼏乎可以感觉像是⼀种动态语⾔(通过推理 和流分析等特性) ，同时移除了编译器可以⽐您更好、更快地处理的⼀整类问题。像 Rust 公司的所有权这样的发展 就是⼀个很好的例⼦，说明这种发展⽐⼈们⼏年前想象的要更进⼀步。 

## 15. The right team of people trumps everything else. 正确的团队胜过⼀切 

Having a team of people who just want to work together and build great things makes a lot of other problems easier to deal with. The word "right" here is highly subjective and contextual, but at least anecdotally, empathy, respect, and friendship have been recurring elements of great teams I've been part of. 

拥有⼀个只想⼀起⼯作并创造伟⼤事物的团队，会让很多其他问题更容易解决。“ right”这个词在这⾥是⾼度主观和 上下⽂相关的，但⾄少是有趣的，移情、尊重和友谊是我曾经参与的伟⼤团队中反复出现的元素。 

## 16. Stick to boring technology, unless there's a good reason not to. 坚持使⽤⽆聊的技术，除⾮有充分的理由 

Boring tech is often older and better understood. There's battle-hardened experience of how to use it effectively, better understanding of its failure modes, and it's easier to find people and resources on how to best apply it. I really like Dan McKinley's idea of innovation tokens. You only get 3. Use them to adopt or build brand new stuff – ideally stuff that will make you better at your core competency – but any more than 3 and the risk of never reaching stability/maturity starts to grow.

⽆聊的技术往往是更古⽼、更容易理解的。在如何有效地使⽤它⽅⾯有着丰富的经验，更好地理解它的故障模式， 并且更容易找到⼈员和资源来最好地应⽤它。我真的很喜欢丹 · ⻨⾦利关于创新代币的想法。你只能得到3个。使 ⽤它们来采⽤或建⽴全新的东⻄-理想的东⻄，将使你更好地在你的核⼼竞争⼒-但任何超过3和⻛险永远达不到稳 定/成熟开始增⻓。 

## 17. Have the smallest team possible, but no smaller. Grow it carefully. 拥有尽可能最⼩的团队，但不能缩⼩，要⼩⼼成⻓ 

A play on a well-known quote, and your mileage may vary on this one. In my career so far, I've reliably seen smaller teams be more effective than larger ones. There's a balance to be found, for sure, which depends on the magnitude and complexity of the problem you're solving. That said, smaller teams benefit from less communication overhead, less room for miscommunication, and more space for everyone's voice to be heard. In a smaller team, it also feels more personal, and I feel more responsible, and I like that. 

⼀个著名的引⽤，你的⾥程可能会有所不同。在我迄今为⽌的职业⽣涯中，我可以肯定地看到⼩团队⽐⼤团队更有 效率。当然，我们需要找到⼀个平衡点，这取决于你所解决问题的规模和复杂程度。也就是说，较⼩的团队受益于 更少的沟通开销，更少的误解空间，更多的空间让每个⼈的声⾳被听到。在⼀个较⼩的团队⾥，这种感觉也更加个 ⼈化，我觉得更有责任感，我喜欢这种感觉。 

## 18. Rest. 休息 

I'm happy to see the gradual de-sexification of the "work all hours to be successful" attitude, and far more attention being put on mental health and well-being. It's incredibly difficult to feel happy when you don't feel rested, and it's even more difficult to do your best work when you're not feeling happy. To work at our best, we have to spend time not working. I like to think of rest as a key part of my ability to work, in the same way it is for physical exercise. 

我很⾼兴地看到，“为了成功，不分昼夜地⼯作”的态度正在逐渐变得不性感，⼈们更加关注⼼理健康和幸福。当你 感觉不到休息的时候，你很难感觉到快乐，当你感觉不快乐的时候，你更难做到最好。为了做到最好，我们不得不 花时间不⼯作。我喜欢把休息看作是我⼯作能⼒的⼀个关键部分，就像体育锻炼⼀样。 

## 19. Don't pick a solution until you've thought of at least one more. 不要选择⼀个解决⽅案，直到你想到⾄少⼀个以上 

It's enticing and exciting when that thing clicks in your head and you realise you found a way to solve the problem. Perhaps with a trivial problem that's cool and there's really nothing more to do. However, if the problem is non-trivial or important, it's worth considering that there may be other solutions you simply haven't thought of yet. 

当那个东⻄在你脑海中闪现，你意识到你找到了解决问题的⽅法，这是⼀件既迷⼈⼜令⼈兴奋的事情。也许对于⼀ 个微不⾜道的问题来说，这很酷，⽽且真的没什么可做的。然⽽，如果这个问题不是琐碎的或重要的，那么值得考 虑的是，可能还有其他你根本没有想到的解决⽅案。 

To avoid getting carried away in the excitement of going from no solution to a solution, and simply going with the first thing that comes into your head, try to think of at least 1 more. Trying to find a second solution often forces you to think differently, and once you have two you'll be forced to consider the trade-offs in order to select one. Such contrasting trade-offs can often help frame the problem more clearly as well.

为了避免陷⼊从没有解决⽅案到解决⽅案的兴奋之中，⽽只是简单地处理你头脑中出现的第⼀件事情，试着⾄少再 想⼀件事。试图找到第⼆个解决⽅案常常会迫使你换⼀种思维⽅式，⼀旦你找到了两个，你就不得不考虑权衡以便 选择⼀个。这种对⽐鲜明的权衡往往也有助于更清晰地描述问题。 

## 20. Have opinions, but avoid expressing them in ways that cause other people to believe you won't change them. 有⾃⼰的观点，但是不要⽤别⼈认为你不会改变它们的⽅式来表达 

Expressing our beliefs and opinions is important, and we should all have the room to do that. However, there's a fine line between sharing an opinion and sounding as though you're sharing an immovable fact. In a team, it's incredibly healthy for everyone to feel like they can challenge an opinion and potentially change it, or their own. 

表达我们的信仰和观点是重要的，我们都应该有这样做的空间。然⽽，分享⼀个观点和听起来好像你在分享⼀个不 可改变的事实之间有⼀条细微的界限。在⼀个团队中，每个⼈都能感觉到⾃⼰可以挑战⼀个观点，并有可能改变 它，或者改变⾃⼰的观点，这是⾮常健康的。 

A great piece of advice I received that helps with this is to express your beliefs along with a percentage of how sure you are. "I'm 95% sure using Visual Basic is a bad idea." Even when it's 95%, it's both an opening for someone to question the belief and create a conversation, and an opportunity for you to simply revise your sureness if new information is learned. 

我收到的⼀个很好的建议就是⽤百分⽐来表达你的信念。“我有95% 的把握认为使⽤ visualbasic 是个坏主意。”即 使是在95% 的情况下，这也是⼀个让⼈质疑⾃⼰的信仰并创造⼀个对话的机会，同时也是⼀个让你在学到新信息后 简单地修正⾃⼰的确信⼼的机会。 

## 21. It's OK to say "I don't know" or "I need to research that before I have an answer". 可以说“我不知道”或者“在我得到答案之前我需要研究⼀下” 

Let's be honest, none of us have a clue what we're doing. You do? OK, well I don't. Our industry moves quickly, and while there's lots of new old things, there's a healthy amount of new new things as well. We're all learning every day, and not having an answer is absolutely fine. Our value is not our ability to know everything, it's our ability to learn, to find out, to answer those questions and create new ones. 

说实话，我们都不知道⾃⼰在做什么。是吗？好吧，我不知道。我们的⾏业发展迅速，虽然有许多新的旧事物，但 也有⼤量的新的新事物。我们每天都在学习，没有答案是绝对正常的。我们的价值不是我们了解⼀切的能⼒，⽽是 我们学习、发现、回答这些问题并创造新问题的能⼒。 

I'm excited when someone tells me "I don't know" because now I know we can explore the problem together and both learn something. Don't hide it as though you're the only one who doesn't know. Often nobody knows, but your honesty just enabled everyone to join in openly and work together. 

当有⼈告诉我“我不知道”时，我很兴奋，因为现在我知道我们可以⼀起探索这个问题，并且双⽅都能学到⼀些东 ⻄。不要把它藏起来，好像你是唯⼀⼀个不知道的⼈。通常没有⼈知道，但是你的诚实使得每个⼈都能够公开地加 ⼊并⼀起⼯作。

## 22. Writing throwaway code to explore a problem space is underrated. 编写⼀次性代码来探索问题空间的作⽤被低估了 

It can be quicker to get it completely wrong a few times and start over than to attempt to get it right first time. Sometimes the best way to explore the problem is by screwing around very close to it and learning as much as you can. 

⽐起尝试第⼀次就把事情做对，把事情做错⼏次然后重新开始可能会更快。有时候，探索问题的最好⽅法就是靠近 它，尽可能多地学习。 

Perhaps you don't really understand the problem space yet, but by trying a few things out you can discover stuff that high level conversations about design, or reading docs will completely miss. With the freedom to make as many mistakes as you like and throw it all away at the end, you can learn very quickly. 

也许你还没有真正理解问题空间，但是通过尝试⼀些东⻄，你可以发现那些⾼层次的关于设计的对话，或者阅读⽂ 档会完全忽略的东⻄。有了犯尽可能多的错误的⾃由，并且在结束的时候抛弃⼀切，你可以学得很快。 

## 23. Manage state carefully. 谨慎管理状态 

Every program has state, but how that state is managed can make a world of difference. Poor management of state is a huge contributing factor to overall system complexity, and often occurs because it hasn't been thought about early enough, before it grew into a much worse version of the problem. 

每个程序都有状态，但是如何管理这个状态可以带来很⼤的不同。对状态的糟糕管理对于整个系统的复杂性来说是 ⼀个巨⼤的影响因素，⽽且经常发⽣是因为在问题变得更糟之前，⼈们没有⾜够早地考虑到这个问题。 

There are lots of different strategies to help, from particular approaches to handling state in a given environment, to using functional languages and/or approaches to create tighter constraints around how state can change. Whatever you do, be deliberate about how state in your system changes. 

有许多不同的策略可以提供帮助，从处理给定环境中状态的特定⽅法，到使⽤函数式语⾔和/或⽅法来创建关于状 态如何改变的更严格的约束。⽆论你做什么，都要仔细考虑你的系统状态是如何改变的。 

## 24. It's all about trade-offs. ⼀切都是权衡取舍 

With almost every decision you make, you're either deliberately or accidentally trading off one thing for another thing. Sometimes the trade-offs are obvious, but sometimes they are layers away from the thing we can see in front of us. Always be thinking about where the trade-offs may be if they're not immediately obvious. 

⼏乎你做的每⼀个决定，你要么是有意要么是⽆意地⽤⼀样东⻄去交换另⼀样东⻄。有时候，权衡是显⽽易⻅的， 但有时候，它们与我们眼前看到的东⻄有着千丝万缕的联系。如果权衡不是⽴即显现的话，就要时刻考虑权衡的⽅ 向。 

A good example that comes to mind is Go. Go has a fairly poor type system (currently), and it's a tiny language. What's the trade-off? Due to its size, and limited support for fanciness, my code looks like your code and I read other people's code with less "wow, I need to rewrite this ASAP" than ever before and I feel far more productive. There's always a trade-off somewhere. Look for it and you'll be in a position to makebetter decisions. 

⼀个很好的例⼦就是围棋。Go 的类型系统相当差(⽬前) ，⽽且它是⼀种很⼩的语⾔。这有什么好处呢？由于它的 ⼤⼩和对浮夸的有限⽀持，我的代码看起来像你的代码，我阅读其他⼈的代码⽐以前更少“哇，我需要尽快重写这 个”，我觉得更有效率。总得有个交换条件。寻找它，你就能做出更好的决定。 

## 25. A good design is one in which you can change your mind without changing too much code. ⼀个好的设计是你可以改变你的想法⽽不需要改变太多的代码 

As per axiom 1, change is constant. That implies that we need to handle changing conditions well to succeed – not just external change that occurs around us and takes us along for the ride, but also the internal change that come from pivots, new features, scaling challenges, etc. 

根据公理1，变化是不变的。这意味着我们需要很好地应对不断变化的环境才能成功——不仅仅是发⽣在我们周围 并带领我们⼀路前⾏的外部变化，还包括来⾃枢纽、新特性、扩展挑战等⽅⾯的内部变化。 

A good system design should accommodate, as much as possible, our need to change how we approach the problem without forcing us to start over from scratch. In other words, the fewer parts we have to change or remove (which should be easy as per axiom 4), the quicker we can move in the face of change; the better the design. 

⼀个好的系统设计应该尽可能地适应我们改变处理问题的⽅式的需要，⽽不是强迫我们从头开始。换句话说，我们 需要更改或删除的部件越少(这应该像公理4所说的那样简单) ，我们在⾯对变化时就能更快地⾏动; 设计就越好
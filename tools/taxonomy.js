async function main() {
  const resp = await fetch('https://main--hlx-test--urfuwo.hlx.page/blog/articles-index.json');

  if (resp.ok) {
    const json = await resp.json();
    const types = new Set();
    const tags = new Set();
    const topics = new Set();

    json.data.forEach((element) => {
      types.add(element.template);
      if (element.tags) {
        element.tags
          .substring(1, element.tags.length - 1)
          .split(',')
          .forEach((tag) => tags.add(tag.substring(1, tag.length - 1)));
      }
      if (element.topics) {
        element.topics
          .split(',')
          .forEach((topic) => topics.add(topic.trim()));
      }
    });
    // eslint-disable-next-line no-console
    console.log(`{
      "metadata": {
        "version": "1.2.0.0",
        "source": "some_url",
        "version_origin": "44"
      },
      "terms": [
        {
          "id": "type",
          "name": "Type"
        },
        {
          "id": "tag",
          "name": "Tag"
        },
        {
          "id": "topic",
          "name": "Topic"
        },${Array.from(types).map((type) => `
        {
          "id": "type-${type}",
          "name": "${type}",
          "parent": "type"
        }`).concat(Array.from(tags).filter((tag) => tag.trim().length > 0).map((tag) => `
        {
          "id": "tag-${tag}",
          "name": "${tag}",
          "parent": "tag"
        }`)).concat(Array.from(topics).filter((topic) => topic.trim().length > 0).map((topic) => `
        {
          "id": "topic-${topic}",
          "name": "${topic}",
          "parent": "topic"
        }`))}
      ]
    }`);
  } else {
    // eslint-disable-next-line no-console
    console.error(`${resp.status} - ${resp.statusText}`);
  }
}
main();

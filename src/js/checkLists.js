export class CheckListsView {

  static get template() {
    return `
.checkLists
  each large in list
    each middle, index in large.item
      if filter.includes(middle.value)
        .checkList #{middle.label}
          each small in middle.item
            .checkList__item #{small.value} #{small.label}
  .back.-floatEntryBtn
     p.-floatEntryBtn__title
       a.-floatEntryBtn__text(href="/") ボタン`
  }
}


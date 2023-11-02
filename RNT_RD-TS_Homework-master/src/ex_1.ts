/*
Требуется реализовать структуру данных двусвязный список. Необходимо выполнить следующие условия:
  1.	Использовать JS class
  2.	Элемент коллекции должен быть generic
  3.	Элемент коллекции должен иметь свойства next и previous
  4.	Экземпляр класса должен предоставлять доступ к следующим свойствам: count (количество элементов), first (первый элемент), last (последний элемент)
*/

class Item<T> {
  public data: T;
  public next: Item<T> | null;
  public previous: Item<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
    this.previous = null;
  }
}

class DoublyLinkedList<T> {
  private head: Item<T> | null;
  private tail: Item<T> | null;
  private count: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }

  public add(value: T): void {
    const newNode = new Item<T>(value);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.previous = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.count++;
  }

  public getCount(): number {
    return this.count;
  }

  public getFirst(): Item<T> | null {
    return this.head;
  }

  public getLast(): Item<T> | null {
    return this.tail;
  }
}


